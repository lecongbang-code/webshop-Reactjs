import React, { Component } from 'react'
import swal from 'sweetalert';
import callApi from './../../../../connect/API-caller';

export default class Imgproductinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heart: true
        };
    }

    showbutton(){
        var id = this.props.product.id;
        if(this.state.heart){
            return (
                <button className="btn iconitemheart" onClick={() => this.checkHeart(id)} ><i className="far fa-heart" />Add to Favarites</button>
            );
        }else{
            return (
                <button className="btn iconitemheart-o" onClick={() => this.checkHeart(id)} ><i className="far fa-heart" />Add to Favarites</button>
            );
        }
    }

    checkHeart(id) {
        if (this.state.heart) {
            const formData = new FormData();
            formData.append('product', id)
            callApi('/api/user/favorites/create', 'POST', formData, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                if (res) {
                    //console.log(res);
                    this.setState({
                        heart: false
                    })
                    console.log(this.state.heart)
                    swal("Great!", "Favour Successfully!", "success")
                } else {
                    callApi(`/api/user/favorites/${id}/delete`, 'DELETE', null, {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }).then(res => {
                        this.setState({
                            heart: true
                        })
                        console.log(this.state.heart)
                        callApi('/api/user/favorites/create', 'POST', formData, {
                            Authorization: `JWT ${localStorage.getItem('token')}`
                        }).then(res => {
                            if (res) {
                                //console.log(res);
                                this.setState({
                                    heart: false
                                })
                                console.log(this.state.heart)
                                swal("Great!", "Favour Successfully!", "success")
                            } else {
                                swal("error", "Products already exist.", "error")
                            }
                        }).catch(err => {
                            //console.log(err);
                            swal("error", "Products already exist.", "error")
                        });
                    })
                }
            }).catch(err => {
                //console.log(err);
                swal("error", "You need to login!", "error")
            });
        } else {
            callApi(`/api/user/favorites/${id}/delete`, 'DELETE', null, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                //console.log(res);
                this.setState({
                    heart: true
                })
                console.log(this.state.heart)
                swal("Great!", "Disfavour Successfully!", "success")
            }).catch(err => {
                swal("error", "Products already exist.", "error")
                //console.log(err);
            });
        }
    }

    render() {
        var { product } = this.props;
        return (
            <div className="card imgproductinfo">
                <img className="card-img-top"
                    src={product.image}
                    alt="jsx-a11y/alt-text" />
                <img className="card-img-bot"
                    src={product.image}
                    alt="jsx-a11y/alt-text" />
                <div className="social-icon-left">
                    <button className="avatar">
                        <a href="https://www.facebook.com/share.php?u=http%3A%2F%2Fabcd.seekproduct.com%2Fproduct%2Fsamsung-a21s-231207%2F&title=Samsung%20A21S" target="_blank">
                            <img alt="jsx-a11y/anchor-is-valid" src="../../assets/img/theme/1.jpg" />
                        </a>
                    </button>
                    <button className="avatar">
                        <a href="https://twitter.com/intent/tweet?text=Samsung%20A21S%3Dhttp%3A%2F%2Fabcd.seekproduct.com%2Fproduct%2Fsamsung-a21s-231207&url=" target="_blank">
                            <img alt="jsx-a11y/anchor-is-valid" src="../../assets/img/theme/2.jpg" />
                        </a>
                    </button>
                    <button className="avatar">
                        <a href="https://plus.google.com/up/?continue=https://plus.google.com/share?url%3Dhttp://abcd.seekproduct.com/product/samsung-a21s-231207" target="_blank">
                            <img alt="jsx-a11y/anchor-is-valid" src="../../assets/img/theme/3.jpg" />
                        </a>
                    </button>
                    <button className="avatar">
                        <a href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle%3Fmini%3Dtrue%26url%3Dhttp%3A%2F%2Fabcd.seekproduct.com%2Fproducts%2Fsamsung-a21s-231207%2F%26title%3DSamsung%2520A21S" target="_blank">
                            <img alt="jsx-a11y/anchor-is-valid" src="../../assets/img/theme/4.jpg" />
                        </a>
                    </button>
                    <button className="avatar">
                        <a href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2FshareArticle%3Fmini%3Dtrue%26url%3Dhttp%3A%2F%2Fabcd.seekproduct.com%2Fproducts%2Fsamsung-a21s-231207%2F%26title%3DSamsung%2520A21S" target="_blank">
                            <img alt="jsx-a11y/anchor-is-valid" src="../../assets/img/theme/5.jpg" />
                        </a>
                    </button>
                    <button className="avatar">
                        <a href="https://oauth.vk.com/authorize?client_id=-1&redirect_uri=https%3A%2F%2Fvk.com%2Fshare.php%3Furl%3Dhttp%3A%2F%2Fabcdseekproduct.com%2Fproduct%2F%26image%3Dhttps%3A%2F%2Fs3-ap-southeast-2.amazonaws.com%2Fsq.mo.works%2Fproduct%2Fc2a32a37-a0b1-4f9b-8f40-636825b7edf4.jpg%26title%3DNEW%2520GENFORCE%2520Inverter%2520Generator%25203.7kVA%26description%3DSamsung%2520A21S&display=widget" target="_blank">
                            <img alt="jsx-a11y/anchor-is-valid" src="../../assets/img/theme/6.jpg" />
                        </a>
                    </button>
                </div>
                <div className="social-icon-right">
                    <button className="btn" onClick={() => window.print()}><i className="fas fa-print" />Print</button>
                    <button className="btn disabled" disabled><i className="fas fa-exclamation-triangle"/>Report</button>
                    {this.showbutton()}
                </div>
            </div>
        )
    }
}
