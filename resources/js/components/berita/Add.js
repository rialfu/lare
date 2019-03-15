import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Add extends Component {

    constructor(){
        super();
        this.onSubmit =
        this.onSubmit.bind(this);
        this.state = {
            formValues: {},
            alert_message:'',
            imagePreviewUrl:''
        };
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let formData  = this.formData;
        let name = event.target.name;
        let value;
        if(name=="gambar"){
            let reader = new FileReader();
            value = event.target.files[0];
            reader.onloadend = () => {
                this.setState({
                  imagePreviewUrl: reader.result
                });
              }
            reader.readAsDataURL(value);
            formValues[name] = value;
        }else{
            value = event.target.value;
            formValues[name] = value;
        }

        // console.log(formValues);

        this.setState({
            formValues:formValues
        });

    }

    onSubmit(e){
        e.preventDefault();
        var rr = new FormData();
        for(let [key, value] of Object.entries(this.state.formValues)){
            if(key=="gambar")
            rr.append(key,value,value.name);
            else
            rr.append(key,value);
        }
        // console.log(JSON.stringify(rr));
        axios.post('http://127.0.0.1:8000/api/berita/store',rr)
        .then(
            res=>{
                this.setState({
                    alert_message:"success"
                });
            }
        ).catch(
            error=>{
                this.setState({
                    alert_message:"error"
                });
            }
        );
    }

    render() {
        return (
            <>
            <div class="card-body">
            {this.state.alert_message=="success"?<SuccessAlert message={"Category added successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while adding the berita."} />:null}
            </div>
            <div class="card">
            <form class="form-horizontal" onSubmit={this.onSubmit}>
            <div class="card-body">
			  <div className="form-group row">
                <label for="judul" class="col-sm-3 control-label col-form-label">Judul</label>
                <div class="col-sm-9">
                    <input className="form-control" type="text" name="judul"
                    placeholder="Judul berita"
                    value={this.state.formValues["judul"]}
                    onChange={this.handleChange.bind(this)} />
                </div>
              </div>
              <div className="form-group">
              <label for="exampleFormControlTextarea1">Artikel</label>
                <textarea
                className="form-control"
                name="isi"
                    placeholder="Artikel"
                    value={this.state.formValues["isi"]}
                    onChange={this.handleChange.bind(this)} rows="3"/>
            </div>
            <div className="form-group row">
            <label for="exampleFormControlFile1" class="col-sm-3 control-label col-form-label">Thumbnail berita</label>
            <div class="col-md-9">
            <div class="custom-file">
                <input type="file" name="gambar"
                class="custom-file-input"
                onChange={this.handleChange.bind(this)} id="validatedCustomFile" required=""/>
                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                <div class="invalid-feedback">Example invalid custom file feedback</div>
            </div>
            <img src={this.state.imagePreviewUrl} style={{width: 150+'px', height: 150+'px'}} />
            </div>
            </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              </div>
			</form>
            </div>
            </>
        );
    }
}

