import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../navbar/Navbar";
const Register = () => {

    const[data,setData] = useState({
        name:'',
        email:'',
        password:'',
        isSubmitted:false,
        
    
})


    const changeInput = (event) => {
        setData({
                ...data,
                [event.target.name]:event.target.value     

        })
    }

    const navigate = useNavigate()
    const submitregisterform = (e) => {
        e.preventDefault();
        let dataUrl = 'https://bbreact-2.onrender.com/api/Login'
        console.log(data)
        axios.post(dataUrl , data).then(() => {
            navigate('/UserLogin')

          
        }).catch((err) => {
            console.error(err)
        })
    }

    return(
        <Fragment>
            <Navbar/>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-3">
                        <div className="card">
                            <div className="card-header">
                                <h3>Register here</h3>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={submitregisterform}>
                                <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter your name" 
                                            name="name"
                                            value = {data.name}
                                            onChange={changeInput}
                                          />
                                </div>
                                <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Enter your email" 
                                            name="email"
                                            value = {data.email}
                                            onChange={changeInput}
                                          />
                                </div>
                                <div className="form-group">
                                            <input type="password" className="form-control" placeholder="enter your password" 
                                            name="password"
                                            value = {data.password}
                                            onChange={changeInput}
                                          />
                                </div>

                                <button type="submit" className="btn btn-sm btn-success">Register</button>

                                    </form>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}


export default Register
