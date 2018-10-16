from django.shortcuts import render
import requests
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse


class VendaList (APIView):
    def get(self, request):
        try:
            lista_vendas = Venda.objects.all()
            serializers = VendaSerializer(lista_vendas, many=True)
            return Response(serializers.data)
        except Exception:
            return JsonResponse({'mensagem': "Ocorreu um erro no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, response):
        try:
            serializer = VendaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED) #status201 vaga criada com sucesso
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) #status400 bad request
        except Exception:
            return JsonResponse({'mensagem': "Ocorreu um erro no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) #status500 erro servidor

#Definindo metodos GET (que precisam de parametros)
class VendaDetalhes(APIView):
    def get(self, request, pk):
        try:
            if pk == "0":
                return JsonResponse({'mensagem': "O ID deve ser maior que zero."}, status=status.HTTP_400_BAD_REQUEST)
            venda = Venda.objects.get(pk=pk)
            serializer = VendaSerializer(venda)
            return Response(serializer.data)
        except Venda.DoesNotExist:
            return JsonResponse({'mensagem': "A venda não existe"}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'mensagem': "Ocorreu um erro no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            if pk == "0":
                return JsonResponse({'mensagem': "O ID deve ser maior que zero."}, status=status.HTTP_400_BAD_REQUEST)
            venda = Venda.objects.get(pk=pk)
            serializer = VendaSerializer(venda, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Venda.DoesNotExist:
            return JsonResponse({'mensagem': "A venda não existe"}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'mensagem': "Ocorreu um erro no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            if pk == "0":
                return JsonResponse({'mensagem': "O ID deve ser maior que zero."}, status=status.HTTP_400_BAD_REQUEST)
            venda = Venda.objects.get(pk=pk)
            venda.delete()
            return Response(status=status.HTTP_204_NO_CONTENT) #status204 vaga removida com sucesso
        except Venda.DoesNotExist:
            return JsonResponse({'mensagem': "A vaga não existe"}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return JsonResponse({'mensagem': "Ocorreu um erro no servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)