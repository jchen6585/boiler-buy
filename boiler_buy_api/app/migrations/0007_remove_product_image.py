# Generated by Django 4.1.2 on 2022-10-07 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
    ]
