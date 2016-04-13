import React from 'react-native';

export default React.StyleSheet.create({
    list: {},

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight:10
    },

    optionLabel: {
        flex: 1,
    },

    optionIndicator: {
        marginRight:6,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    optionIndicatorIcon: {
        width: 20,
        height: 20
    },

    separator: {
        height: 1,
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: '#efefef',
    },
    radio:{
        marginRight:6,
        borderWidth:1,
        borderColor:'#666666',
        borderRadius:10,
        width:20,
        height:20,
        alignItems:'center',
        justifyContent:'center'
    },
    selected:{
        color:'#0066CC'
    },
    dot:{
        width:14,
        height:14,
        backgroundColor:'#0066CC',
        borderRadius:7
    }
});