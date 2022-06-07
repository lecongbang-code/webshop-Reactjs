import React, { Component } from 'react'
import AddBank from './AddBank';
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom';
export default class SocialAdd extends Component {

	constructor(props) {
		super(props);
		this.state = {
		    company_id:'',
		    facebook:'',
		    instagram:'',
		    twitter:'',
			token: localStorage.getItem("token"),
			formErrors: {
                facebook: "",
                instagram: "",
                twitter: "",             
            }
		};
	      }
componentDidMount(){
	let url = 'http://172.104.50.113:886'
	let token= this.state.token;
	var {match}= this.props;
	let site=match.params.site
	console.log(site);
	

	axios.get(`${url}/api/user/company/detail/${site}/`, {
		headers: {
		  Authorization: `JWT ${token}`,
		},
	      })
	      .then((res) => {
		  this.setState({
		      company_id:res.data.id
		  });
		  if(res.data.social_link){
		  this.setState({
		      facebook:res.data.social_link.facebook,
		      instagram:res.data.social_link.instagram,
		      twitter:res.data.social_link.twitter
		  });
	      }
	      });
}


AddSocial=(even)=>{
	var {history} = this.props

	let url = 'http://172.104.50.113:886'
	even.preventDefault();
	let token = localStorage.getItem("token");
	var {company_id,facebook,instagram,twitter}=this.state;
	let formData = new FormData();
	formData.append("facebook", facebook);
	formData.append("instagram", instagram);
	formData.append("twitter", twitter);
	
	axios.post(`${url}/api/user/company/add-social-link/${company_id}`, formData, {
	  headers: {
		Authorization: `JWT ${token}`,
	  },
	})
	.then((res) => {
		swal({
			title: "Success !",
			text: "You clicked the button!",
			icon: "success",
			button: "Aww yiss!",
		  }); history.goBack()
	}).catch(()=>{
		swal({
			title: "Not Success!",	
			icon: "error",
			button: "Cancel !",
		  });
	});
}



    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'facebook':
                formErrors.facebook = value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/) ? "" : "Facebook is invalid!";
                break;
            case 'instagram':
                formErrors.instagram =value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/) ? "" : "Instargam is invalid!";
                break;
            case "twitter":
                formErrors.twitter =value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/) ? "" : "Twiiter is invalid!";               
				break;
			default:
				break;
        }
        this.setState({ formErrors, [name]: value });
    };

Back=()=>{
	var history=this.props
	return history.goBack
	
}
    render() {
		const { formErrors } = this.state;
		var {facebook, instagram, twitter}= this.state;
	return (
		<div className="content">
		<div className="container-fluid">
		    <div className="row">
		      <div className="col-md-12 container" >
			<div className="card">
			  <div className="card-header card-header-primary">
			    <h4 className="card-title pull-left">Add Social Link:</h4>  <h2></h2>
			  </div>
			  <div className="card-body" id="caibunhat">
			    <form
			      onSubmit={this.AddSocial}
			      encType="multipart/form-data"
			    >
			      <div className="form-group"> 
				<label id="facebook"><i class="fab fa-facebook-square"></i> Facebook</label>
				<input
				id='insiput'
				  onChange={this.onChange}
				  type="text"
				  name="facebook"
				  placeholder="Enter link"
				  className="form-control"
				  value={facebook}
				  required
				/>
				  {formErrors.facebook.length > 0 && (
                            <span className="errorMessage ">{formErrors.facebook}</span>
                        )}
			      </div>
			      <div className="form-group">
				<label id="intagam"><i class="fab fa-instagram"></i> Instagram</label>
				<input
				id='insiput'
				  onChange={this.onChange}
				  type="text"
				  name="instagram"
				  placeholder="Enter link"
				  className="form-control"
				  value={instagram}
				  required
				/>
				  {formErrors.instagram.length > 0 && (
                            <span className="errorMessage ">{formErrors.instagram}</span>
                        )}
			      </div>
			      <div className="form-group">
				<label id="twiter"><i class="fab fa-twitter-square"></i> Twitter</label>
				<input
				id='insiput'
				  onChange={this.onChange}
				  type="text"
				  name="twitter"
				  placeholder="Enter link"
				  className="form-control"
				  value={twitter}
				  required
				/>
				  {formErrors.twitter.length > 0 && (
                            <span className="errorMessage ">{formErrors.twitter}</span>
                        )}
			      </div>
			      <div className="col-sm-6 ml-auto">

				  <Link  to="/admin/company/add_bank"
				 
				  className="btn btn-info pull-right">
				 
				Back
				
				</Link>

				<button
				  type="submit"
				  className="btn btn-primary pull-right"
				>
				  Add Social
				</button>

			

			      </div>
			    </form>
			  </div>
			</div>
		      </div>
		    </div>
		</div>
	 </div>
	)
    }
}
 