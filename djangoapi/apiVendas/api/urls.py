#Rotas API
from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'^vendas$', VendaList.as_view()),
    url(r'^vendas/(?P<pk>[0-9]+)$', VendaDetalhes.as_view()),
]