import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Post = () => {
    let [yourPost, setYourzPost] = useState('')
    let [auth, setAuth] = useState()
    let [coment, setComents] = useState()
    let { postId } = useParams()
    let [values, setValues] = useState({
        text: ''
    })
    console.log(postId);
    useEffect(() => {
        async function getPost() {
            try {
                let { data } = await axios.get(`/posts/${postId}`)
                setYourzPost(data);

            } catch (error) {
            }
        }
        getPost()
        async function getM() {
            try {
                let { data } = await axios.get(`/auth`)
                setAuth(data._id);
            } catch (error) {
            }
        }
        getM()

    }, [])

    function handleComent() {
        async function getComent() {
            try {
                let { data } = await axios.post(`/posts/comment/${postId}`, values)
                setComents(data);
                toast('added coment', { type: 'success' })

            } catch (error) {
                toast("coments error", { type: 'error' })
                console.log(error);
            }
        }
        getComent()
    }
    function handleChange(e) {
        setValues(oldV => ({
            ...oldV,
            text: e.target.value,
        }))
    }
    function deleteComentNow(e) {
        console.log(e.target);
        console.log(e.target.name);
        console.log(45);
    }
    console.log(coment);

    return (
        <>
            <Header />
            {(!yourPost) ? <div className='container d-flex justify-content-center mt-5'>
                <img src="/load.gif" alt="" />
            </div>
                :
                <section className='discussion container pt-4'>
                    <Link to='/posts' className='text-decoration-none text-dark networkLink mb-3'>Back to post</Link>
                    <div className='d-flex gap-4 postImgCard p-2 mb-3'>
                        <div className='one-item'>
                            <Link to={`/profile/${yourPost?.user}`}><img src={yourPost?.avatar} alt="" /> </Link>
                            <h5 className='posts-name text-center'>{yourPost?.name}</h5>
                        </div>
                        <div className='d-flex flex-column justify-content-between gap-1 devCardHero mt-2'>
                            <p>{yourPost?.text}</p>
                            <div>
                                <p className='emailparagrf p-0 m-0 mb-4'>Posted on   {yourPost?.date[5]}{yourPost?.date[6]}/{yourPost?.date[8]}{yourPost?.date[9]}/{yourPost?.date[2]}{yourPost?.date[3]}</p>
                                <div>
                                    <button className='networkLink me-2 '><img src="/zor.png" className='zor' alt="" />{yourPost?.likes.length}</button>
                                    <button className='networkLink me-2'><img src="/yomon.svg" className='yomon' alt="" /></button>
                                    <Link className=' signin text-white text-decoration-none me-2'>Discussion</Link>

                                </div>

                            </div>
                        </div>
                    </div>

                    <p className='posts-say mb-4'> Leave a Comment</p>
                    <div >
                        <textarea onChange={handleChange} value={values.text} name="text" id="text" className='w-100' cols="100" rows="5" placeholder='Comment the post'></textarea>
                    </div>
                    <button onClick={handleComent} className='mt-3 posts-submit mb-5'>Submit</button>
                    {coment?.map((e) => {
                        return (e.user === auth) ? <div className='d-flex gap-4 postImgCard p-2 mb-3'>
                            <div className='one-item'>
                                <Link to={`/profile/${e.user}`}><img src={e.avatar} alt="" /> </Link>
                                <h5 className='posts-name text-center'>{e?.name}</h5>
                            </div>
                            <div className='d-flex flex-column justify-content-between gap-1 devCardHero mt-2'>
                                <p className='mt-4 fs-3'>{e?.text}</p>
                                <div>
                                    <p className='emailparagrf p-0 m-0 mb-4'>Posted on   {e?.date[5]}{e?.date[6]}/{e?.date[8]}{e?.date[9]}/{e?.date[2]}{e?.date[3]}</p>
                                    <button onClick={deleteComentNow} className='mb-4 networkLink px-3 py-2 me-2 bg-danger text-white mt-3'   ><span name={e?._id} className="material-symbols-outlined">close</span></button>
                                </div>
                            </div>
                        </div>
                            :
                            <p></p>

                    })}
                    {yourPost?.comments.map((e) => {
                        return (e.user !== auth) ? <div className='d-flex gap-4 postImgCard p-2 mb-3'>
                            <div className='one-item'>
                                <Link to={`/profile/${e.user}`}><img src={e.avatar} alt="" /> </Link>
                                <h5 className='posts-name text-center'>{e?.name}</h5>
                            </div>
                            <div className='d-flex flex-column justify-content-between gap-1 devCardHero mt-2'>
                                <p className='mt-4 fs-3'>{e.text}</p>
                                <div>
                                    <p className='emailparagrf p-0 m-0 mb-4'>Posted on   {e?.date[5]}{e?.date[6]}/{e?.date[8]}{e?.date[9]}/{e?.date[2]}{e?.date[3]}</p>
                                    {/* <button className={(e.user===auth) ? 'mb-4 networkLink px-3 py-2 me-2 bg-danger text-white mt-3' : 'd-none mb-4 networkLink px-3 py-2 me-2 bg-danger text-white mt-3'}  ><span className="material-symbols-outlined">close</span></button> */}

                                </div>
                            </div>
                        </div>
                            :
                            <p></p>
                    })}


                </section>

            }
        </>
    )
}

export default Post;
