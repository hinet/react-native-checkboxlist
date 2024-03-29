'use strict';

import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import BaseComponent from './BaseComponent'
import Styles from './styles'

const propTypes = {
    options: PropTypes.array.isRequired,
    selectedOptions: PropTypes.array,
    maxSelectedOptions: PropTypes.number,
    onSelection: PropTypes.func,
    renderIndicator: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderRow: PropTypes.func,
    renderText: PropTypes.func,
    disabled: PropTypes.bool
};
const defaultProps = {
    options: [],
    selectedOptions: [],
    onSelection(option){},
    style:{},
    optionStyle:{},
    disabled: false
};

class CheckboxList extends BaseComponent {

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        this.ds = ds;

        this.state = {
            dataSource: ds.cloneWithRows(this.props.options),
            selectedOptions: this.props.selectedOptions || [],
            disabled: this.props.disabled
        };

        this._bind(
            '_renderRow',
            '_selectOption',
            '_isSelected',
            '_updateSelectedOptions'
        );
    }

    componentWillReceiveProps(nextProps) {
        this._updateSelectedOptions(nextProps.selectedOptions);
        this.setState({
            disabled: nextProps.disabled
        });
    }
    _updateSelectedOptions(selectedOptions) {
        this.setState({
            selectedOptions,
            dataSource: this.ds.cloneWithRows(this.props.options)
        });
    }

    _validateMaxSelectedOptions() {
        const maxSelectedOptions = this.props.maxSelectedOptions;
        const selectedOptions = this.state.selectedOptions;

        if (maxSelectedOptions && selectedOptions.length > 0 && selectedOptions.length >= maxSelectedOptions) {
            selectedOptions.splice(0, 1);
        }

        this._updateSelectedOptions(selectedOptions);
    }

    _selectOption(selectedOption) {

        let selectedOptions = this.state.selectedOptions;
        console.log(selectedOption);
        console.log(selectedOptions);
        if(typeof(selectedOption.value) != 'undefined'){
            var index = selectedOptions.indexOf(selectedOption.value);
        }else{
            var index = selectedOptions.indexOf(selectedOption);
        }
        if (index === -1) {
            this._validateMaxSelectedOptions();
            if(typeof(selectedOption.value) != 'undefined'){
                selectedOptions.push(selectedOption.value);
            }else{
                selectedOptions.push(selectedOption);
            }

        } else {
            selectedOptions.splice(index, 1);
        }

        this._updateSelectedOptions(selectedOptions);

        //run callback
        this.props.onSelection(selectedOption);
    }

    _isSelected(option) {
        if(typeof(option.value) != 'undefined'){
            return this.state.selectedOptions.indexOf(option.value) !== -1;
        }else{
            return this.state.selectedOptions.indexOf(option) !== -1;
        }

    }

    _renderIndicator(option) {
        if (this._isSelected(option)) {
            if(typeof this.props.renderIndicator === 'function') {
                return this.props.renderIndicator(option);
            }
            if(typeof(option.value) != 'undefined'){
                return (
                    <View style={[Styles.radio,{borderColor:'#0066CC'}]}>
                        <Text style={Styles.selected}>{option.value}</Text>
                    </View>
                );
            }
            return (
                <View style={[Styles.radio,{borderColor:'#0066CC'}]}>
                    <View style={Styles.dot}></View>
                </View>
            );
        }else{
            if(typeof(option.value) != 'undefined'){
                return (<View style={Styles.radio}><Text>{option.value}</Text></View>);
            }
            return (<View style={Styles.radio}></View>);
        }
    }

    _renderSeparator(option) {

        if(typeof this.props.renderSeparator === 'function') {
            return this.props.renderSeparator(option);
        }

        return (<View style={Styles.separator}></View>);
    }

    _renderText(option) {

        if(typeof this.props.renderText === 'function') {
            return this.props.renderText(option);
        }
        if(typeof(option.label) != 'undefined'){
            return (<Text>{option.label}</Text>);
        }else{
            return (<Text>{option}</Text>);
        }

    }

    _renderRow(option) {

        if(typeof this.props.renderRow === 'function') {
            return this.props.renderRow(option);
        }

        const disabled = this.state.disabled;
        return (

            <View style={this.props.optionStyle}>
                <TouchableOpacity
                    activeOpacity={disabled ? 1 : 0.7}
                    onPress={!disabled ? ()=>{this._selectOption(option)} : null}
                >
                    <View>
                        <View
                            style={Styles.row}
                        >
                            <View style={Styles.optionIndicator}>{this._renderIndicator(option)}</View>
                            <View style={Styles.optionLabel}>{this._renderText(option)}</View>
                        </View>
                    </View>
                </TouchableOpacity>
                {this._renderSeparator(option)}
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={[Styles.list, this.props.style]}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
            />
        );
    }
};

CheckboxList.propTypes = propTypes;
CheckboxList.defaultProps = defaultProps;

module.exports = CheckboxList;
