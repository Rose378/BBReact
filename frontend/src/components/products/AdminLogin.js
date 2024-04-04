import React, { Fragment, useEffect , useState } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {

    
    const [data,setData] = useState({
        admin:'',
        password:''
    })
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
 

//  useEffect(() => {
//     setData({
//         admin: data.admin,
//         password:data.password
//     })
//  } , [])
    const changeInput = (event) => {
        setData({
            ...data,
            [event.target.name] : [event.target.value]
        })
    }

    const navigate = useNavigate()

    function submitform(e){
        e.preventDefault();
        if(data.admin[0] === 'rosemary'){
            navigate('/ProductAdmin')
        }
  
    }
    return(
        <Fragment>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                    <h2>Login access for Admin</h2>
                                </div>
                                <div className="card-body">  
                                    <form onSubmit={submitform}>
                                      
                                    <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Admin Name" 
                                            name="admin"
                                            value = {data.admin}
                                            onChange={changeInput}
                                          />
                                        </div>
                                        
                                        <div className="form-group" style={{display:"flex"}}>
                                            <input  type={showPassword ? 'text' : 'password'}
                                            style={{borderRight:"none"}}
                                            className="form-control" placeholder="Enter Password" 
                                            name="password"
                                            value = {data.password}
                                            onChange={changeInput}
                                        
                                          />
                                            <button style={{border:"none" , width:"70px"}}
                                            onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={showPassword ?faEye: faEyeSlash } /></button>
                                        </div>
                                        <button type="submit" className="btn btn-sm btn-success">Submit</button>
                                    </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Fragment>
    )
}



export default AdminLogin