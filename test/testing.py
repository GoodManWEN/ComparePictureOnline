from flask import Response
from functools import partial
from functools import update_wrapper
# solve partial not copy '__name__' property problem
from os import getcwd , path

def testpics(imgPath):
    print(imgPath ,'called')
    with open(imgPath, 'rb') as f:
        image = f.read()
    return Response(image , mimetype='image/jpeg')

def testpics2():
    # avoid overwriting an existing endpoint function: testpics in flask
    pass

if __name__ == 'test.testing':
    cwd = getcwd()
    pic1 = partial(testpics ,path.join(cwd , 'test/20191017163234957.jpg'))
    update_wrapper(pic1, testpics)
    pic2 = partial(testpics ,path.join(cwd , 'test/20191017163234957_2.jpg'))
    update_wrapper(pic2, testpics2)

# def log(text):
#     def decorator(func):
#         def wrapper(*args, **kw):
#             print('%s %s():' % (text, func.__name__))
#             return func(*args, **kw)
#         return wrapper
#     return decorator

# # @log('execute')
# def now():
#     print('2015-3-25')

# now = log('execute')(now)
# now()