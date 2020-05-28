import boto3
import json
import os
import base64
import io
import uuid
import time
from datetime import datetime
from uuid import UUID
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr



DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*'
}
rekognition = boto3.client('rekognition', region_name='us-east-1')
dynamodb = boto3.client('dynamodb', region_name='us-east-1')
dynamodb1 = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb1.Table('log-registry')


def update_index(tableName,faceId, fullName, conf, image):
    response = dynamodb.put_item(
        TableName=tableName,
        Item={
            'logId': {'S': str(uuid.uuid4())},
			'timestamp': {'N': str(time.mktime(datetime.now().timetuple()))},
            'RekognitionId': {'S': faceId},
            'FullName': {'S': fullName},
            'DateTime': {'S': str(datetime.now())},
            'Confidence': {'S': str(conf)},
            'ImageB64' : {'S' : image},
			'dumpy' : {'S' : 'dumy'}
            }
        )

def get_last_logs(faceId, limite = 10):
    response = table.query(IndexName='RekognitionId', Limit=limite, ScanIndexForward= False,KeyConditionExpression=Key('RekognitionId').eq(faceId))
    return response


def handle(event, context):
    body = json.loads(event.get('body') or '{}')
    image = body.get('image', None)
    usuario = ""
    IdUser = ""
    acierto = 0.00
    
    if (image == None):
        return jsonify(statusCode=400)

    fin = image.split("base64")
    file = base64.b64decode(fin[1])
    stream = io.BytesIO(file)
    image_binary = stream.getvalue()
    
    response = rekognition.search_faces_by_image(
            CollectionId='CollectionRekog1',
            Image={'Bytes':image_binary}                                       
            )
        
    for match in response['FaceMatches']:
        print (match['Face']['FaceId'],match['Face']['Confidence'])
            
        face = dynamodb.get_item(
            TableName='rekog-index',  
            Key={'RekognitionId': {'S': match['Face']['FaceId']}}
            )
        
        if 'Item' in face:
            if match['Face']['Confidence'] > acierto: 
                usuario = face['Item']['FullName']['S']
                acierto = match['Face']['Confidence']
                IdUser = match['Face']['FaceId']
                update_index('log-registry',match['Face']['FaceId'],face['Item']['FullName']['S'],
                     match['Face']['Confidence'], image)
                print (face['Item']['FullName']['S'])
    if(len(response['FaceMatches']) == 0):
        update_index('log-registry',"Unknown","Unknown", 0, image)
        print ('no match found in person lookup')

    obj = {
        'usuario': usuario,
        'confidence': acierto
    }
    if(IdUser != ""):
        respon_logs = get_last_logs(IdUser)
        obj['userLogs'] = respon_logs['Items']
    
    return jsonify(obj)



def default_encoder(x):
    if isinstance(x, datetime):
        return x.isoformat()
    elif isinstance(x, UUID):
        return str(x)
    elif isinstance(x, Decimal):
        if x % 1 == 0:
            return int(x)
        else:
            return round(float(x), 12)
    return x

def jsonify(obj=None, statusCode=200):
    response = {
        'statusCode': statusCode,
        'headers': DEFAULT_HEADERS
    }
    if obj is not None:
        response['headers']['Content-Type'] = 'application/json'
        response['body'] = json.dumps(obj, default=default_encoder)

    return response