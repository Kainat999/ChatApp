# Generated by Django 4.2.5 on 2023-10-24 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chatroom', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(default=None, max_length=100)),
                ('message', models.TextField(blank=True, null=True)),
                ('thread_name', models.CharField(blank=True, max_length=50, null=True)),
                ('timestemp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterModelManagers(
            name='userprofile',
            managers=[
            ],
        ),
    ]
