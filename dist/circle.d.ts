
    import * as React from 'react';
    export interface IProps extends React.SVGProps<SVGElement> {
        title: string;
        desc: string;
        children?: React.ReactNode;
    }

    export default class circle extends React.Component<IProps> { }
    