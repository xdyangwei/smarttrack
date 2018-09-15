from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired


class NameForm(FlaskForm):
    name = StringField('What is your name?', validators=[DataRequired()])
    submit = SubmitField('Submit')

class VideoForm(FlaskForm):
    switch_map = BooleanField(u'Open the map', default=1)
    switch_video = BooleanField(u'Open the video')
    submit = SubmitField(u'Submit')



class SetForm(FlaskForm):
    a = BooleanField(u'管理用户', default=1)
    b = BooleanField(u'管理上帝')
    c = BooleanField(u'管理人间')
    d = BooleanField(u'管理一切')

    submit = SubmitField(u'OK')