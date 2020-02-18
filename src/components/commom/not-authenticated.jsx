import React from 'react';

const NotAuthenticated = () =>{
    return (
        <React.Fragment>
            <div>
                <h3>403</h3>
                <h5 className="unauthorized">Please login to view this content!</h5> 
                <br></br><br></br>
                <h5 className="unauthorized">Credential Admin (Demo): </h5> 
                <h5 className="unauthorized"><strong>email :</strong> this@admin.com</h5> 
                <h5 className="unauthorized"><strong>password :</strong> 12345</h5> 
                <br></br><br></br>
                <h5 className="unauthorized">Credential Employee (Demo): </h5> 
                <h5 className="unauthorized"><strong>email :</strong> user1@user.com</h5> 
                <h5 className="unauthorized"><strong>password :</strong> 12345</h5> 

            </div>
        </React.Fragment>
    );
}

export default NotAuthenticated;