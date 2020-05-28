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

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('rekog-index')

def delete_faces_from_collection(faces):
    collection_id='CollectionRekog1'
    client=boto3.client('rekognition', region_name='us-east-1')

    response=client.delete_faces(CollectionId=collection_id,
                               FaceIds=faces)
    
    print(str(len(response['DeletedFaces'])) + ' faces deleted:')
    for faceId in response['DeletedFaces']:
        table.delete_item(
            Key={
             'RekognitionId': faceId
            }
        )
    return len(response['DeletedFaces'])



def handle(event, context):
    body = json.loads(event.get('body') or '{}')
    nombre = body.get('name', None)
    response = table.scan(FilterExpression=Attr('FullName').eq(nombre))
    items = response['Items']
    
    if (len(items) == 0):
        return jsonify(statusCode=204)

    else:
        faceid = items[0]['RekognitionId']
        faces=[]
        faces.append(faceid)
        delete_faces_from_collection(faces)
        obj = {
            'name': nombre
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