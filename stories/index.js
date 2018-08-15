import React from 'react'
import { storiesOf } from '@storybook/react';

const stories = storiesOf('react-icon-lib-example', module);

import Alerts from '../dist/alerts'
import Camera from '../dist/camera'
import Circle from '../dist/circle'

stories
    .add('Alerts Icon', () => (
        <Alerts />
    ))
    .add('Camera Icon', () => (
        <Camera />
    ))
    .add('Circle Icon', () => (
        <Circle />
    ))