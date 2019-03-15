import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

export default class Listing extends Component {

	constructor(){
		super();
		this.state = {
            news:[],
            alert_message:''
        }
	}

	componentDidMount()
	{
		axios.get('http://127.0.0.1:8000/api/berita')
		.then(response=>{
            console.log(response.data);
            this.setState({news:response.data});
		});
    }

    onDelete(berita_id)
    {
        axios.delete('http://127.0.0.1:8000/api/berita/delete/'+berita_id)
        .then(
            response=>{
            var news = this.state.news;
            for(var i =0; i < news.length; i++){
                if(news[i].id==berita_id){
                    news.splice(i,1);
                    this.setState({news:news});
                }
            }
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
            <div class="card">
            <div class="card-body">
            {this.state.alert_message=="success"?<SuccessAlert message={"Berita deleted successfully."} />:null}
            {this.state.alert_message=="error"?<ErrorAlert message={"Error occured while deleting the berita."} />:null}
            <h5 class="card-title">Berita</h5>
            <div class="table-responsive">
            <table id="zero_config" className="table table-striped table-bordered">
			  <thead>
			    <tr>
			      <th>#</th>
                  <th>Judul</th>
                  <th>Isi</th>
                  <th>Foto</th>
			      <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{

			  		this.state.news.map((berita)=>{
			  			return(
				  			<tr>
						      <td>1</td>
                              <td>{berita.judul}</td>
                              <td>{berita.isi}</td>
						      <td>{berita.foto==''?("Tidak ada thumbnail"):(<img src={"/uploads/file/"+berita.foto} style={{width: 150+'px', height: 150+'px'}}/>)}</td>
						      <td>{berita.created_at}</td>
                              <td>{berita.updated_at}</td>
                              <td>
                                    <Link to={'/dashboard/berita/edit/'+berita.id}>Edit | </Link>
                                    <a href="#" onClick={this.onDelete.bind(this,berita.id)}>Delete</a></td>
						    </tr>
					    )
			  		})
			  	}
			  </tbody>
            </table>
            </div>
            </div>
            </div>
        );
    }
}

