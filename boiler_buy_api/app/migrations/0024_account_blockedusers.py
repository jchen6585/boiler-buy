# Generated by Django 4.1.1 on 2022-12-09 16:34

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0023_merge_20221209_1633'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='blockedUsers',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), default=list, size=None),
        ),
    ]