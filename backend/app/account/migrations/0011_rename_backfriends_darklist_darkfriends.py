# Generated by Django 3.2.12 on 2024-04-22 23:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0010_rename_backlist_darklist'),
    ]

    operations = [
        migrations.RenameField(
            model_name='darklist',
            old_name='backfriends',
            new_name='darkfriends',
        ),
    ]
