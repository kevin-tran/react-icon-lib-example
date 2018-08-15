import React from 'react'
import { storiesOf } from '@storybook/react';

const stories = storiesOf('react-icon-lib-example', module);

import Accelerator from '../dist/accelerator'
import Alarm from '../dist/alarm'
import Anchor from '../dist/anchor'

stories
    .add('Alerts Icon', () => (
        <Accelerator />
    ))
    .add('Camera Icon', () => (
        <Alarm />
    ))
    .add('Circle Icon', () => (
        <Anchor />
    ))