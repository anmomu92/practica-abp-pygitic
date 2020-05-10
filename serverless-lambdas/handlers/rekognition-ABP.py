import boto3
import json
import os
import base64
import io
import uuid
from datetime import datetime
from uuid import UUID
from decimal import Decimal



DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*'
}
rekognition = boto3.client('rekognition', region_name='us-east-1')
dynamodb = boto3.client('dynamodb', region_name='us-east-1')


def update_index(tableName,faceId, fullName, conf):
    response = dynamodb.put_item(
        TableName=tableName,
        Item={
            'logId': {'S': str(uuid.uuid4())},
            'RekognitionId': {'S': faceId},
            'FullName': {'S': fullName},
            'DateTime': {'S': str(datetime.now())},
            'Confidence': {'S': str(conf)}
            }
        )

def handle(event, context):
    body = json.loads(event.get('body') or '{}')
    image = body.get('image', None)
    usuario = ""
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
                update_index('log-registry',match['Face']['FaceId'],face['Item']['FullName']['S'], match['Face']['Confidence'])
                print (face['Item']['FullName']['S'])
            
        else:
            print ('no match found in person lookup')
    obj = {
        'usuario': usuario,
        'confidence': acierto
        }
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