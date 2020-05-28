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




def get_last_logs(limite = 10):
	response = table.query(IndexName='dumpy', Limit=limite, ScanIndexForward= False, KeyConditionExpression=Key('dumpy').eq('dumy'))
	return response

def handle(event, context):
	body = json.loads(event.get('body') or '{}')
	limite = body.get('limite', 10)
	response = get_last_logs(limite=limite)
	obj = {'userLogs': response['Items']}
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