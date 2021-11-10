import * as React from 'react';
import { Grid, Input, Button } from '@scuf/common';
import IListHeaderProps from './IListHeaderProps';
import './ListHeader.scss';
/*
    The header portion of all pages on the site are visually identical and at least some of the same functionality, so it is perfect for a shared component.
*/
export class ListHeader extends React.Component<IListHeaderProps> {

    render() {
        const { title, onAdd, placeholder, onFilter, buttonText, description } = this.props;
        return (
            <Grid.Row>
                <Grid.Column width={12}>
                    <div className="list-header">
                        <div className="title-wrap">
                            <h1 className="page-title">{title}</h1>
                            <div className="right-header">
                                {
                                    // Notice you can do  advanced inline  boolean statements by wrapping them in parentheses 
                                    (onFilter && placeholder) &&
                                    <Input className="list-header-search-box" placeholder={placeholder} search={true} onChange={onFilter} />
                                }
                                {
                                    (onAdd && buttonText) &&
                                    <Button className="create-button" size="small" type="primary" content={buttonText} onClick={onAdd} />
                                }
                            </div>
                        </div>
                        <p>{description}</p>
                    </div>

                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default ListHeader;