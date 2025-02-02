/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import instance from '../../apis/utils/instance';
import { sendAuthMailRequest } from '../../apis/api/sendAuthMail';
import { useInput } from "../../hooks/useInput";
import { duplicateUsername, editAccount } from "../../apis/api/account";

export default function AccountEditPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    
    const [username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
    const [ usernameCheck, setUsernameCheck ] = useState(false)
    const [nickname, nicknameChange, nicknameMessage, setNicknameValue, setNicknameMessage] = useInput("nickname");
    const [name, nameChange, nameMessage, setNameValue] = useInput("name");
    const [email, emailChange, emailMessage, setEmailValue] = useInput("email");

    
  
    // 이메일 인증하기
    const sendAuthMailMutation = useMutation({
      mutationKey: "sendAuthMailMutation",
      mutationFn: sendAuthMailRequest,
      retry: 0,
      onSuccess: (response) => {
        if(response.data) {
            alert("메일 전송을 완료하였습니다.");
        }else {
            alert("메일 전송에 실패하였습니다.");
        }
      }
    });
  
    const handleSendAuthMailClick = () => {
      sendAuthMailMutation.mutate();
    }
  
    // 로그아웃
    const handleLogoutClick = () => {
  
      localStorage.removeItem("AccessToken");
      instance.interceptors.request.use((config) => {
        config.headers.Authorization = null;
        return config;
      });
      queryClient.refetchQueries("principalQuery");
      window.location.replace("/auth/signin");
    }

    const editAccountMutation = useMutation("editAccountMutation", editAccount, {
      onSuccess: response => {
        console.log(response)
      },
      onError: error => {
        console.log(error)
      }
    })

    const duplicateUsernameMutation = useMutation("duplicateUsernameMutation", duplicateUsername, {
      onSuccess: response => {
        setUsernameCheck(true)
        alert("사용할 수 있는 아이디입니다.")
      },
      onError: error => {
        alert(error.response.data.usernameCheck)
      }
    })

    const editAccountButton = () => {
      let changeUserInfo = {
        userId: principalData.data.userId,
        username: username,
        nickname: nickname,
        name: name,
        email: email
      }
      if (usernameCheck === true) {
        if(window.confirm("회원 정보를 변경하시겠습니까?") === true) {
          editAccountMutation.mutate(changeUserInfo)
          console.log(changeUserInfo)
        }
      } else {
        alert("닉네임 중복 검사를 진행해주세요.")
      }
    }

    
    useEffect(() => {
      setUsernameValue(principalData.data.username)
      setNicknameValue(principalData.data.nickname)
      setNameValue(principalData.data.name)
      setEmailValue(principalData.data.email)
    }, [principalData])
    
    useEffect(() => {
      setUsernameCheck(false)
    }, [username])

    const duplicateUsernameCheck = () => {
      duplicateUsernameMutation.mutate(username)
    }
  
    return (
      <div css={s.accountEditPage}>
        <div>
            <label>사용자 이름: </label>
            <input type="text" defaultValue={username} onChange={userNameChange}/>
            <button onClick={duplicateUsernameCheck}>중복체크</button>
        </div>
        <div>
            <label>이름: </label>
            <input type="text" defaultValue={name} onChange={nameChange}/>
        </div>
        <div>
            <label>닉네임: </label>
            <input type="text" defaultValue={nickname} onChange={nicknameChange}/>
        </div>
        <div>
            <label>이메일: </label>
            <input type="text" defaultValue={email} onChange={emailChange}/>
          {
            principalData?.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0
              ?
              <button onClick={handleSendAuthMailClick}>인증하기</button>
              :
              <div></div>
          }
        </div>
        <div css={s.accountEditButtons}>
          <button onClick={editAccountButton}>정보 수정</button>
          <button onClick={() => navigate("/account/edit/password")}>비밀번호 수정</button>
          <button onClick={handleLogoutClick}>로그아웃</button>
        </div>
      </div>
    );
  }
