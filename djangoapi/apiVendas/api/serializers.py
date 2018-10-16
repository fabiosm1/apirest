from rest_framework import serializers
from .models import *

#Mapear como a entidade Venda será retornada através das requisições feitas à API
class VendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venda
        fields = ["id", "produto", "quantidade", "preco"]