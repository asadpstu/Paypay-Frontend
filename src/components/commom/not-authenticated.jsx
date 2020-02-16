import React from 'react';

const NotAuthenticated = () =>{
    return (
        <React.Fragment>
            <div>
                <h3>403</h3>
                <h5 className="unauthorized">Please login to view this content!</h5> 
            </div>
        </React.Fragment>
    );
}

export default NotAuthenticated;