from django.db.models.signals import post_save, pre_save, pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User

import requests

PRIVATE_HEADERS = { "Private-Key": "2d316c69-15d1-47bb-b38d-1e4c764c6d97" }
PUBLIC_HEADERS = { "Project-Id": "70049943-b572-4372-9f3c-fbdeca940e0f" }



@receiver(post_save, sender=User)
def create_chat_engine_user(sender, instance, created, **kwargs):
    if created:
        json = {
            'username': instance.username,
            'email': instance.email,
            'secret': instance.password,
            'first_name': instance.first_name,
            'last_name': instance.last_name
        }
        # Create User
        r = requests.post('https://api.chatengine.io/users/', headers=PRIVATE_HEADERS, json=json)
        print('Create chat user', r.status_code)


@receiver(pre_save, sender=User)
def update_chat_engine_user(sender, instance, **kwargs):
    try:
        old_user = User.objects.get(id=instance.id)
        new_user = {
            'username': instance.username,
            'email': instance.email,
            'secret': instance.password,
            'first_name': instance.first_name,
            'last_name': instance.last_name
        }
        # Update User
        PUBLIC_HEADERS["User-Name"] = old_user.username
        PUBLIC_HEADERS["User-Secret"] = old_user.password
        r = requests.patch('https://api.chatengine.io/users/me/', headers=PUBLIC_HEADERS, json=new_user)
        print('Patch chat user', r.status_code)

    except User.DoesNotExist:
        pass    

@receiver(pre_delete, sender=User)
def delete_chat_engine_user(sender, instance, **kwargs):
    # Delete User
    PUBLIC_HEADERS["User-Name"] = instance.username
    PUBLIC_HEADERS["User-Secret"] = instance.password
    r = requests.delete('https://api.chatengine.io/users/me/', headers=PUBLIC_HEADERS)
    print('Delete chat user', r.status_code) 