import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Edit extends Component {

    constructor(props){
        super(props);
        this.onSubmit =
        this.onSubmit.bind(this);
        this.state = {
            imagePreviewUrl:null,
            formValues: {},
            alert_message:''
        }
    }

	componentDidMount()
	{
        axios.get('http://127.0.0.1:8000/api/berita/edit/'+this.props.match.params.id)
		.then(response=>{
            console.log(response.data.message);
            if(response.data.message == "success"){
                this.setState({formValues:response.data});
            }else if(response.data.message == "notfound"){
                this.props.history.push('/berita');
            }
		}).catch(
            error=>{
                console.log("GA ADA");
        });
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value;
        if(name=="foto" && event.target.files[0] != null){
            let reader = new FileReader();
            value = event.target.files[0];
            reader.onloadend = () => {
                this.setState({
                  imagePreviewUrl: reader.result
                });
              }
            reader.readAsDataURL(value);
            formValues[name] = value;
        }else if(name=="foto" && event.target.files[0] == null){
            value = this.state.formValues.foto;
            formValues[name] = value;
        }else{
            value = event.target.value;
            formValues[name] = value;
        }

        this.setState({formValues})
        console.log(typeof(formValues.foto));
    }

    onSubmit(e){
        e.preventDefault();
        var rr = new FormData();
        console.log(this.state.formValues);
        for(let [key, value] of Object.entries(this.state.formValues)){
            if(key=="gambar"){
                rr.append(key,value,value.name);
            }else{
            rr.append(key,value);
            }
        }
        // rr.append('kunci','isi');
        // rr.append('_method', 'PATCH');
        axios.post('http://127.0.0.1:8000/api/berita/update/'+this.props.match.params.id,rr)
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
                    placeholder="Judul berita"
                    value={this.state.formValues["isi"]}
                    onChange={this.handleChange.bind(this)} rows="3"/>
            </div>
            <div className="form-group row">
            <label for="exampleFormControlFile1" class="col-sm-3 control-label col-form-label">Thumbnail berita</label>
            <div class="col-md-9">
            <div class="custom-file">
            <input type="file"
            name="foto"
            class="form-control-file"
            onChange={this.handleChange.bind(this)}
            id="validatedCustomFile"/>
                <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                <div class="invalid-feedback">Example invalid custom file feedback</div>
            </div>
            <img src={this.state.imagePreviewUrl==null?("/uploads/file/"+this.state.formValues["foto"]):(this.state.imagePreviewUrl)} style={{width: 150+'px', height: 150+'px'}}/>
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

