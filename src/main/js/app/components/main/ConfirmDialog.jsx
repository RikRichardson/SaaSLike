import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

class ConfirmDialog extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        var {
            okLabel = 'OK',
            cancelLabel = 'Cancel',
            title = _('main.confirm.title'),
            confirmation,
            confirmed,
            dismiss,
            show,
            modal = true
            } = this.props;

        var actions = [
            <FlatButton
                label={cancelLabel}
                secondary={true}
                onClick={dismiss}
            />,
            <FlatButton
                label={okLabel}
                primary={true}
                onClick={()=> {
                    confirmed.apply();
                }}
            />,
        ];

        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={modal}
                    open={show}
                    onRequestClose={dismiss}
                >
                    {confirmation}
                </Dialog>
            </div>
        );
    }
}

module.exports = ConfirmDialog;