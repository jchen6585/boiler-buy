from email.policy import default
from django.db import models
from django.contrib.postgres.fields import *
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Listing(models.Model):
    name = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    stock = models.IntegerField(default=1)
    
    def __str__(self):
        return self.name
        
class Product(models.Model):
    productType = models.CharField(max_length=50)
    priceDollars = models.PositiveIntegerField()
    priceCents = models.PositiveSmallIntegerField()
    shippingDollars = models.PositiveIntegerField()
    shippingCents = models.PositiveSmallIntegerField()
    stockCount = models.PositiveBigIntegerField(default=1)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    reported = models.BooleanField(default=False, blank=True)
    isPending = models.BooleanField(default=False, blank=True)
    isSold = models.BooleanField(default=False, blank=True)
    canShip = models.BooleanField()
    canMeet = models.BooleanField()
    brand = models.CharField(max_length=128, default="")
    image = models.FileField(null=True, blank=True, upload_to='products/', )
    
class Shop(models.Model):
    description = models.CharField(max_length=250, default='')
    isVisible = models.BooleanField(default=False)
    products = models.ManyToManyField("Product")

class Account(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50, primary_key=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True, db_column="shop_id")
    sellerRating = models.FloatField(default=0)
    sellerRatingCount = models.IntegerField(default=0)
    sellerReviews = ArrayField(models.CharField(max_length=500), default=list)

    def __str__(self):
        return str(self.username)

class Shop(models.Model):
    description = models.CharField(max_length=250, default='')
    isVisible = models.BooleanField(default=False)
    products = models.ManyToManyField("Product")

class PurchaseHistory(models.Model):
    email = models.CharField(max_length=50)
    purchaseTime = models.DateTimeField(auto_now=False, auto_now_add=True)
    name = models.CharField(max_length=50)
    sellerEmail = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    totalPriceDollars = models.PositiveIntegerField()
    totalPriceCents = models.PositiveSmallIntegerField()
    image = models.FileField(null=True, blank=True, upload_to='products/', )
