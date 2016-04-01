import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
/**
 * Used code from http://jsbin.com/rajaqu/1/edit?html,js,output
 * https://gitter.im/callemall/material-ui/archives/2015/02/06
 * thanks a lot to author :)
 *
 * Обертка на полем ввода, использующая маску из плагина jquery
 * https://github.com/RobinHerbots/jquery.inputmask/blob/3.x/README.md
 *
 * Предполагается замена на родной компонент material-ui, feature request-ы на эту тему есть
 */

class MaskedTextField extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    render () {
        return <TextField
            floatingLabelText={this.props.floatingLabelText}
            id={this.props.id}
            value={this.state.value}
            multiLine={this.props.multiLine}
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            type={this.props.type}
            style={this.props.style}/>;
    }

    componentDidMount () {
        var node = ReactDOM.findDOMNode(this);

        var $input = $(node).find('input');
        var self = this;

        $input.inputmask({
            alias: this.props.alias,
            mask: this.props.mask,
            showMaskOnHover: false,
            isComplete: function (buffer, opts) {
                var val = buffer.join('').replace(/\D/g, '');
                this.setState({value: val}, self.props.onInputChange(val));
            }.bind(this)
        });
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

}

MaskedTextField.defaultProps = {};

MaskedTextField.propTypes = {
    alias: React.PropTypes.string,
    mask: React.PropTypes.string,
    errorText: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    hintText: React.PropTypes.string,
    id: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    type: React.PropTypes.string,
    style: React.PropTypes.object
}

module.exports = MaskedTextField;