# Generated by Django 4.1.1 on 2022-12-09 05:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_merge_0017_shophistory_locations_0018_chatmessages'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmessages',
            name='receiverImage',
            field=models.FileField(default=None, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='chatmessages',
            name='senderImage',
            field=models.FileField(default=None, null=True, upload_to=''),
        ),
    ]
