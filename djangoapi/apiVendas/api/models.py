from django.db import models

#Atributos da api vendas
class Venda(models.Model):
    produto = models.CharField(max_length=40, null=False)
    quantidade = models.IntegerField(null=False)
    preco = models.FloatField(null=False)

    def __str__(self):
        return self.produto

