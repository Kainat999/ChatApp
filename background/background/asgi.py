import os

from django.core.asgi import get_asgi_application
from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from chatroom.consumers import PersonalChatConsumer, OnlineStatusConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'background.settings')

django_asgi_app = get_asgi_application()

websocket_patterns = [
    re_path(r'ws/chat/(?P<id>\d+)/$', PersonalChatConsumer.as_asgi()),
    re_path(r'ws/online/', OnlineStatusConsumer.as_asgi())
]

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_patterns
        )
    ),
})
