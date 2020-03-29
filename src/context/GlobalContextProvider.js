import React from 'react';

const initialState = {
    user: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_USER': {
            return {
                ...state,
                
            }
        }
            
    
        default:
            throw new Error('Not good')
    }
}

const GlobalContextProvider = ({ children }) => {
	return <div>{children}</div>;
};

export default GlobalContextProvider;
