# Generated by Django 4.1.1 on 2022-12-07 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_merge_20221130_1723'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupAds',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('products', models.ManyToManyField(to='app.product')),
            ],
        ),
    ]