import React from 'react'
import { storiesOf } from '@storybook/react';

const stories = storiesOf('react-icon-lib-example', module);

import Accelerator from '../dist/accelerator'
import Alarm from '../dist/alarm'
import Anchor from '../dist/anchor'
import Check from '../dist/check'

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
    .add('Icon with Props', () => (
        <Check height={100} width={100}>
        <circle cx='30' cy='30' r='30' fill='pink' />
        </Check>
    ))