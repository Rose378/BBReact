import React, { Fragment, useEffect , useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserLogin = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const [data,setData] = useState({
       logins:[]
    })

    const [mydata, SetMyData] = useState({
        username:'',
        password:''
    });

    const changeInput = (e) => {
        SetMyData({
            ...mydata,
            [e.target.name] : e.target.value
        })
    }
    const { id } = useParams();


useEffect(() => {
    let dataUrl = `https://bbreact-2.onrender.com/api/Login`
    axios.get(dataUrl).then((res) => {
        setData({
            logins:res.data
        })
    })
    
},[id])



 const navigate = useNavigate()
const submitdata = (e) => {
    e.preventDefault();
    console.log(data.logins, "llll")
    console.log(mydata, 'myy')
    const user = data.logins.find(user => user.name === mydata.username && user.password === mydata.password);
    if(user){
        navigate('/ProductList')
    }
    else{
        toast.error('No details. Please Register to Login')
    }
}
//  useEffect(() => {
//     setData({
//         admin: data.admin,
//         password:data.password
//     })
//  } , [])


    return(
        <Fragment>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header">
                                    <h2>User Login</h2>
                                </div>
                                <div className="card-body">  
                                    <form onSubmit={submitdata}>
                                      
                                    <div className="form-group">
                                            <input type="text" className="form-control" placeholder="User Name" 
                                            name="username"
                                            value = {mydata.username}
                                            onChange={changeInput}
                                          />
                                        </div>
                                        
                                        <div className="form-group" style={{display:"flex"}}>
                                            <input  type={showPassword ? 'text' : 'password'}
                                            style={{borderRight:"none"}}
                                            className="form-control" placeholder="Enter Password" 
                                            name="password"
                                            value = {mydata.password}
                                            onChange={changeInput}

                                          />
                                            <button style={{border:"none" , width:"70px"}}
                                            onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={showPassword ?faEye: faEyeSlash } /></button>
                                        </div>

                                        <div className="form-group" > 
                                        <input type="submit" value="Submit" className=" btn btn-success btn-sm"/>

                                        </div>
                                    </form>

                                    <p style={{color:'blue' , fontSize:'12px'}}>Not yet registered?
                                <Link to={'/Register'} className="ml-2">Register here</Link>
                            </p>
                            </div>
                           
                        </div>

                    </div>

                </div>

            </div>

        </Fragment>
    )
}



export default UserLogin