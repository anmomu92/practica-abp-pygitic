import boto3
import json
import uuid
import os
import base64
import uuid
from datetime import datetime
from uuid import UUID
from decimal import Decimal



DEFAULT_HEADERS = {
    'Access-Control-Allow-Origin': '*'
}

AWS_REGION = os.environ['AWS_REGION']
#BUCKET_NAME = os.environ['BUCKET_NAME']
s3 = boto3.resource('s3')



def handle(event, context):
    body = json.loads(event.get('body') or '{}')
    image = body.get('image', None)

    if (image == None):
        return jsonify(statusCode=400)
    
    userId = body.get('userId', None)
    if (userId == None):
        return jsonify(statusCode=400)
    
    fin = image.split("base64")
    file = base64.b64decode(fin[1])
    object = s3.Object('image-store-rekog-abp','index/'+ str(uuid.uuid4()) + ".jpeg")
    ret = object.put(Body=file,
                    Metadata={'FullName':userId}
                    )
    return jsonify(statusCode=200)


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