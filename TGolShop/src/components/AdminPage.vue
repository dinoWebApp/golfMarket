<template>
  <div class="container d-flex">
    <div id="admin" v-if="adminData === false">
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="패스워드" autocomplete="off" @keyup.enter="login" v-model="pw">
        <label for="floatingPassword">패스워드</label>
      </div>
      <button @click="submit" class="w-100 btn btn-lg btn-danger mt-2 mb-3" style="font-weight:bold;">승인</button>
    </div>

    <div class="col-3 col-md-2" id="sidebar" v-if="adminData === true">
      <img src="../assets/tgolshop.png" class="img-fluid" alt="">
      <div class="list-group">
        <a @click="clickMemberControl" class="list-group-item list-group-item-action">회원조회</a>
        <a @click="clickProductEnroll" class="list-group-item list-group-item-action">상품등록</a>
        <a @click="clickProductEdit" class="list-group-item list-group-item-action">상품수정</a>
        <a @click="clickProductControl" class="list-group-item list-group-item-action">상품삭제</a>
        <a @click="clickOrderControl" class="list-group-item list-group-item-action">주문관리</a>
        <a @click="clickQna" class="list-group-item list-group-item-action">문의관리</a>
        <a @click="clickPersonalQna" class="list-group-item list-group-item-action">1:1문의관리</a>
        <a @click="clickFitting" class="list-group-item list-group-item-action">피팅문의</a>
        <a @click="clickNonMember" class="list-group-item list-group-item-action">비회원문의</a>
      </div>
    </div>


    <div class="col-10 mt-5" v-if="productEnroll === true">
      <div class="container mt-3 col-11 col-sm-11 col-md-11 col-lg-9 col-xxl-7 border ">
        <div class="mt-4 mb-3">
          <h3>상품 등록 하기</h3>
        </div>
        <div class="row justify-content-center">
          <div class="col-9 ">
            분류
          
            <div class="dropdown">
              <button id="divide" class="btn btn-light border dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                선택
              </button>
              <ul class="dropdown-menu">
                <li><a @click="productDivide" class="dropdown-item" href="#">골프클럽</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">헤드</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">샤프트</a></li>
              </ul>
            </div>
            
          </div>

          <div class="col-9 mt-2" v-if="divide === '골프클럽'">
            브랜드 선택
            <div class="dropdown">
              <button id="brand" class="btn btn-light border dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                선택
              </button>
              <ul class="dropdown-menu">
                <li><a @click="brandChoice" class="dropdown-item" href="#">핑</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">캘러웨이</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">테일러메이드</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">PXG</a></li>
              </ul>
            </div>
          </div>
          
          <div class="col-9 mt-2">
            상품명
            <input v-bind:value="productName" @input="inputProductName" type="text" class="form-control mb-2" id="productName" placeholder="브랜드와 모델명 모두 입력해주세요.">
            원가
            <input v-bind:value="beforeDiscount" @input="inputBeforeDiscount" type="text" class="form-control mb-2" placeholder="원가">
            할인가
            <input v-bind:value="productPrice" @input="inputProductPrice" type="text" class="form-control mb-2" placeholder="할인가">
            <div class="d-flex mt-4">
              옵션 (추가된 옵션은 수정이 불가합니다.)
              <button @click="addOption" class="btn btn-sm btn-outline-secondary ms-3">추가</button>
            </div>
            <div v-for="i in optionNumber" :key="i">
              <div class="d-flex">
                <div class="col-10 mt-2">
                  <input @input="inputOptionText" type="text" class="form-control mb-2" placeholder="옵션 내용">
                </div>
                <div class="col-2 mt-2">
                  <input @input="inputOptionPrice" type="text" class="form-control mb-2" placeholder="가격">
                </div>
              </div>
            </div>
            
            
          </div>
          <div class="col-9 mt-2">
            
          </div>
          
          <div class="col-9 mt-2">
            배송 방법
            <div class="border mb-3">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" @click="selectKor">
                <label class="form-check-label" for="inlineRadio1">국내 배송</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" @click="selectOut">
                <label class="form-check-label" for="inlineRadio2">해외 배송</label>
              </div>
            </div>

            제품 사진
            <div class="input-group mb-3">           
              <input type="file" class="form-control" id="inputGroupFile01" accept="image/*" @change="selectThum">
              <label class="input-group-text" for="inputGroupFile01">썸네일</label>
            </div>
            <div class="input-group mb-3">
              <input type="file" class="form-control" id="inputGroupFile02" accept="image/*" @change="selectInfo">
              <label class="input-group-text" for="inputGroupFile02">상품 정보</label>
            </div>
            
            <button @click="posting" type="button" class="btn btn-danger col-12 mt-3 mb-3" style="font-weight:bold;">상품 등록 하기</button>
          </div>
          
        </div>
      </div>
  
    </div>
    <div class="col-10 mt-5" v-if="productEdit">
      <div class="container mt-3 col-11 col-sm-11 col-md-11 col-lg-9 col-xxl-7 border ">
        <div class="mt-4 mb-3">
          <h3>상품 수정</h3>
        </div>
        <div v-if="editProductModal === false">
          <div v-for="item in allProducts" :key="item">
            <hr/>
            <div class="d-flex">
              <span class="me-1">
                {{ item.productName }}
              </span>
              <button @click="editModal">수정</button>
            </div>
          </div>
        </div>
        <div v-if="editProductModal">
          <div class="row justify-content-center">
            <div class="col-9 mt-2">
              상품명
              <input v-bind:value="editProductName" @input="inputEditProductName" type="text" class="form-control mb-2" id="productName" placeholder="브랜드와 모델명 모두 입력해주세요.">
              원가
              <input v-bind:value="beforeDiscount" @input="inputBeforeDiscount" type="text" class="form-control mb-2" placeholder="원가">
              할인가
              <input v-bind:value="productPrice" @input="inputProductPrice" type="text" class="form-control mb-2" placeholder="할인가">
              <div class="d-flex mt-4">
                옵션 (추가된 옵션은 수정이 불가합니다.)
                <button @click="addOption" class="btn btn-sm btn-outline-secondary ms-3">추가</button>
              </div>
              <div v-for="i in optionNumber" :key="i">
                <div class="d-flex">
                  <div class="col-10 mt-2">
                    <input @input="inputOptionText" type="text" class="form-control mb-2" placeholder="옵션 내용">
                  </div>
                  <div class="col-2 mt-2">
                    <input @input="inputOptionPrice" type="text" class="form-control mb-2" placeholder="가격">
                  </div>
                </div>
              </div>
              
              
            </div>
            <div class="col-9 mt-2">
              
            </div>
            
            <div class="col-9 mt-2">
              배송 방법
              <div class="border mb-3">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" @click="selectKor">
                  <label class="form-check-label" for="inlineRadio1">국내 배송</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" @click="selectOut">
                  <label class="form-check-label" for="inlineRadio2">해외 배송</label>
                </div>
              </div>

              제품 사진
              <div class="input-group mb-3">           
                <input type="file" class="form-control" id="inputGroupFile01" accept="image/*" @change="selectThum">
                <label class="input-group-text" for="inputGroupFile01">썸네일</label>
              </div>
              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02" accept="image/*" @change="selectInfo">
                <label class="input-group-text" for="inputGroupFile02">상품 정보</label>
              </div>
              
              <button @click="editPosting" type="button" class="btn btn-danger col-5 mt-3 mb-3 me-1" style="font-weight:bold;">수정</button>
              <button @click="backEdit" style="font-weight:bold;" class="btn btn-success col-5 mt-3 mb-3">목록으로</button>
            </div>
          </div>
          
        </div>
        
      </div>
  
    </div>
    <div v-if="memberControl" class="col-10 ms-1">
      <div class="container mt-5">
        <h2>회원관리</h2>
        <div class="row mt-4">
          <div class="col-3">
            <select id="searchTool" @change="searchTool" class="form-select" aria-label="Default select example">
              <option selected value="0">분류</option>
              <option value="nickName">닉네임</option>
              <option value="id">아이디</option>
              <option value="phoneNum">휴대폰번호</option>
            </select>
          </div>
          <div class="col-6">
            <input v-bind:value="searchMemberText" @input="inputMember" type="text" class="form-control">
          </div>
          
          <button @click="clickSearch" class="btn btn-danger col-auto">검색</button>
          
          <div v-if="memberInfo">
            <div class="container mt-3 col-12  border mb-3">
              <hr/>
              <div class="row">
                <div class="col-4"> 성명: </div>
                <div class="col-auto"> {{searchedMember.name}} </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-4"> 닉네임: </div>
                <div class="col-auto"> {{searchedMember.nickName}} </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-4"> 휴대폰 번호: </div>
                <div class="col-auto"> {{searchedMember.phoneNum}} </div>
              </div>
              <hr/>
              <div class="row mb-3">
                <div class="col-4"> 주소: </div>
                <div class="col-auto"> {{searchedMember.address}}, {{searchedMember.detailAddress}} </div>
              </div>
              <hr/>
              <div class="row mb-3">
                <div class="col-4"> 포인트: </div>
                <div class="col-4"> 
                  <input v-model="searchedMember.point" type="text">
                </div>
                <div class="col-auto">
                  <button @click="changePoint">수정</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="productControl" class="ms-1 col-9">
      <div class=" container mt-5">
        <h2>상품 관리</h2>
        <div class="row mt-4">
          <div class="col-5">
            <select id="selectedDivide" @change="selectDivide" class="form-select" aria-label="Default select example">
              <option selected value="0">종류</option>
              <option value="골프클럽">골프클럽</option>
              <option value="헤드">헤드</option>
              <option value="샤프트">샤프트</option>
            </select>
          </div>
          <div class="col-5" v-if="selectedDivide === '골프클럽'">
            <select id="selectedBrand" @change="selectBrand" class="form-select" aria-label="Default select example">
              <option selected value="0">브랜드</option>
              <option value="ping">핑</option>
              <option value="callaway">캘러웨이</option>
              <option value="taylormade">테일러메이드</option>
              <option value="pxg">PXG</option>
            </select>
          </div>
          
          
          <button @click="clickProductSearch" class="btn btn-danger col-auto">검색</button>
          
          <div v-if="productsInfo" class="border">
            <div v-for="(item, index) in searchedProducts" :key="index">
              <hr/>
              <div>
                <span>상품명 : {{item.productName}}</span>
              </div>
              <div v-for="(option, index) in item.optionData" :key="index">
                옵션{{index + 1}} : {{option.optionText}}
              </div>
              <div class="mb-2">
                <span>상품 가격 : {{item.productPrice}}</span>
              </div>
              <button @click="deleteProduct" class="btn btn-danger">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-9" v-if="orderControl">
      <div class="mt-5 border">
        <div class="mt-3" v-for="item in orderData" :key="item">
          <hr/>
          <div class="row">
            <div class="col-4"> 주문 번호: </div>
            <div class="col-auto"> {{item.orderId}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 장바구니: </div>
            <div class="col-auto"> {{item.cartBool}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 상품명: </div>
            <div class="col-auto"> {{item.productName}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 옵션: </div>
            <div class="col-auto"> {{item.optionText}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 상품 개수: </div>
            <div class="col-auto"> {{item.orderNum}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 상품 가격: </div>
            <div class="col-auto"> {{item.totalPrice}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 결제 가격: </div>
            <div v-if="item.cartBool" class="col-auto"> {{item.payPrice}}(일괄) </div>
            <div v-if="item.cartBool === false" class="col-auto"> {{item.payPrice}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 결제 날짜: </div>
            <div class="col-auto"> {{item.purchaseDate}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 성명: </div>
            <div class="col-auto"> {{item.name}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 닉네임: </div>
            <div class="col-auto"> {{item.nickName}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 휴대폰 번호: </div>
            <div class="col-auto"> {{item.phoneNum}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 우편번호: </div>
            <div class="col-auto">({{item.addressNum}})</div>
          </div>
          <div class="row">
            <div class="col-4"> 주소: </div>
            <div class="col-auto"> {{item.address}} </div>
          </div>
          <div class="row">
            <div class="col-4"> 상세 주소: </div>
            <div class="col-auto"> {{item.detailAddress}} {{item.addressName}}  </div>
          </div>
          <div class="row">
            <div class="col-4"> 배송 형태: </div>
            <div v-if="item.deliverOut" class="col-auto"> 해외배송  </div>
            <div v-if="item.deliverOut === ''" class="col-auto"> 국내배송  </div>
          </div>
          <div class="row">
            <div class="col-4"> 개인통관고유부호: </div>
            <div class="col-auto"> {{ item.personalNum }} </div>
          </div>
          
          <div class="row">
            <div class="col-4"> 상품 상태: </div>
            <div class="col-auto"> {{item.currentState}} </div>
            <div class="col-auto">
              <select @change="selectState" name="state">
                <option value="0" selected="selected">상태선택</option>
                <option value="결제완료">결제완료</option>
                <option value="배송준비">배송준비</option>
                <option value="배송시작">배송시작</option>
                <option value="배송완료">배송완료</option>
              </select>
            </div>
            <div class="col-auto">
              <button @click="changeState">수정</button>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-4"> 운송장 번호: </div>
            <div class="col-auto"> 
              <input v-model="item.deliNum" type="text">
            </div>
            <div class="col-auto">
              <button @click="changeDeliNum">수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-9" v-if="qna">
      <div class="mt-5 border">
        <div class="mt-3" v-for="item in qnaData" :key="item">
          <hr/>
          <div>
            <div>
              <span>문의 번호:{{item.id}}</span>
              <span class="ms-2" style="color:blue;" v-if="item.reply">답변 완료</span>
              <span class="ms-2" style="color:red;" v-if="item.reply === false">답변 미완료</span>
            </div>
            <div>
              <span>문의 상품 : {{item.productName}}</span>
            </div>
            <span> 작성자 : {{item.nickName}}</span>
            <span style="font-size:12px" class="ms-2">{{item.date}} </span>
          </div>
          <div class="mt-1 mb-3">
            내용 : {{item.text}}
          </div>
          <div v-if="item.reply">
            관리자의 답변 : {{item.adminText}}
          </div>
          <div v-if="item.reply === false">
            <textarea @input="inputReply" class="col-9" name="admin" id="" cols="30" rows="3"></textarea>
            <button @click="submitReply">등록</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-9" v-if="personalQna">
      <div class="mt-5 border">
        <div class="mt-3" v-for="item in personalQnaData" :key="item">
          <hr/>
          <div>
            <div>
              <span>문의 번호:{{item.id}}</span>
              <span class="ms-2" style="color:blue;" v-if="item.reply">답변 완료</span>
              <span class="ms-2" style="color:red;" v-if="item.reply === false">답변 미완료</span>
            </div>
            <span> 작성자 : {{item.nickName}}</span>
            <span style="font-size:12px" class="ms-2">{{item.date}} </span>
          </div>
          <div class="mt-1 mb-3">
            내용 : {{item.text}}
          </div>
          <div v-if="item.reply">
            관리자의 답변 : {{item.adminText}}
          </div>
          <div v-if="item.reply === false">
            <textarea @input="inputPersonalReply" class="col-9" name="admin" id="" cols="30" rows="3"></textarea>
            <button @click="submitPersonalReply">등록</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-9" v-if="fittingQna">
      <div class="mt-5 border">
        <div class="mt-3" v-for="item in fittingData" :key="item">
          <hr/>
          <div>
            <div>
              <span>문의 번호:{{item.id}}</span>
              <span class="ms-2" style="color:blue;" v-if="item.reply">답변 완료</span>
              <span class="ms-2" style="color:red;" v-if="item.reply === false">답변 미완료</span>
            </div>
            <span> 작성자 : {{item.nickName}}</span>
            <span style="font-size:12px" class="ms-2">{{item.date}} </span>
          </div>
          <div class="mt-1 mb-3">
            내용 : {{item.text}}
          </div>
          <div v-if="item.reply">
            관리자의 답변 : {{item.adminText}}
          </div>
          <div v-if="item.reply === false">
            <textarea @input="inputFittingReply" class="col-9" name="admin" id="" cols="30" rows="3"></textarea>
            <button @click="submitFittingReply">등록</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-9" v-if="nonMemberQna">
      <div class="mt-5 border">
        <div class="mt-3" v-for="item in nonMemberQnaData" :key="item">
          <hr/>
          <div>
            <div>
              <span>문의 번호:{{item.id}}</span>
              <span class="ms-2" style="color:blue;" v-if="item.reply">답변 완료</span>
              <span class="ms-2" style="color:red;" v-if="item.reply === false">답변 미완료</span>
            </div>
            <span> 작성자 : {{item.nickName}}</span>
            <span style="font-size:12px" class="ms-2">{{item.date}} </span>
          </div>
          <div class="mt-1 mb-3">
            내용 : {{item.text}}
          </div>
          <div v-if="item.reply">
            관리자의 답변 : {{item.adminText}}
          </div>
          <div v-if="item.reply === false">
            <textarea @input="inputNonMemberReply" class="col-9" name="admin" id="" cols="30" rows="3"></textarea>
            <button @click="submitNonMemberReply">등록</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
 


</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { watch } from '@vue/runtime-core'
export default {
  name: 'AdminPage',
  setup() {
    let divide = ref('');
    let brand = ref('');
    let productEnroll = ref(false);
    let productEdit = ref(false);
    let productControl = ref(false);
    let orderControl = ref(false);
    let qna = ref(false);
    let personalQna = ref(false);
    let fittingQna = ref(false);
    let nonMemberQna = ref(false);
    let productName = ref('');
    let beforeDiscount = ref('');
    let productPrice = ref('');
    let adminData = ref(false);
    let pw = ref('');
    let thumbnail = ref();
    let infoImage = ref();
    let deliverKor = ref(false);
    let deliverOut = ref(false);
    let optionNumber = ref(1);
    let optionText = ref('');
    let optionPrice = ref('');
    let optionData = ref([]);
    
    let checkData = ref({
      pw : pw
    });
    let memberControl = ref(false);
    let selectedSearch = ref('');
    let searchMemberText = ref('');
    let searchedMember = ref({});
    let memberInfo = ref(false);
    let selectedBrand = ref('');
    let selectedDivide = ref('');
    let searchedProducts = ref([]);
    let productsInfo = ref(false);
    let orderData = ref([]);
    let qnaData = ref([]);
    let personalQnaData = ref([]);
    let allProducts = ref([]);
    let editProductModal = ref(false);
    let editId = ref(0);
    let editProductName = ref('');
    let fittingData = ref([]);
    let nonMemberQnaData = ref([]);
    

    const router = useRouter();
    axios.get('/api/admin-check').then(res=>{
      if(res.data === 'not login') {
        router.push({path:'/'});
        alert('권한이 없습니다.');
      } else if(res.data[0] === 'admin' && res.data[1] === 'admin') {
        alert('관리자 페이지에 접속하셨습니다.');
      } else {
        alert('권한이 없습니다.');
        router.push({path:'/'});
      }
    }).catch(err=>{
      console.log(err);
    });

    function submit() {
      axios.post('/api/admin-pw', checkData.value)
      .then(res=>{
        if(res.data === 'ok') {
          adminData.value = true;
        } else {
          alert('패스워드 불일치');
        }
      }).catch(err=>{
        console.log(err);
      });
    }
    
    function productDivide(e) {
      document.getElementById('divide').innerText = e.target.innerHTML;
      divide.value = e.target.innerHTML;
    }

    function brandChoice(e) {
      document.getElementById('brand').innerText = e.target.innerHTML;
      switch(e.target.innerHTML) {
        case '핑':
          brand.value = 'ping';
          break;
        case '캘러웨이':
          brand.value = 'callaway';
          break;
        case '테일러메이드':
          brand.value = 'taylormade';
          break;
        case 'PXG':
          brand.value = 'pxg';
          break;
      }
    }

    function inputProductName(e) {
      productName.value = e.target.value;
    }
    function inputEditProductName(e) {
      editProductName.value = e.target.value;
    }

    function inputBeforeDiscount(e) {
      beforeDiscount.value = e.target.value;
    }

    function inputProductPrice(e) {
      productPrice.value = e.target.value;
    }

    function selectThum(e) {
      thumbnail.value = e.target.files[0];
    }

    function selectInfo(e) {
      infoImage.value = e.target.files[0];
    }

    function selectKor() {
      deliverKor.value = true;
      deliverOut.value = false;
    }

    function selectOut() {
      deliverKor.value = false;
      deliverOut.value = true;
    }

    function inputOptionText(e) {
      optionText.value = e.target.value;
    }

    function inputOptionPrice(e) {
      optionPrice.value = e.target.value;
    }

    function addOption() {
      optionNumber.value += 1;
      let option = {
        optionText : optionText.value,
        optionPrice : optionPrice.value
      }
      optionData.value.push(option);
      optionText.value = '';
      optionPrice.value = 0;
    }

    function posting() {
      let dataSet = ref({
        divide : divide.value,
        brand : brand.value,
        productName : productName.value,
        beforeDiscount : beforeDiscount.value,
        productPrice : productPrice.value,
        optionData : optionData.value,
        deliverKor : deliverKor.value,
        deliverOut : deliverOut.value,
        thumbnail : '',
        infoImage : ''
      })
      const formData1 = new FormData();
      const formData2 = new FormData();
      
      formData1.append("api_key", "557214385787327");
      formData1.append("upload_preset", "tgolshop");
      formData1.append("timestamp", (Date.now() / 1000) | 0);
      formData1.append(`file`, thumbnail.value);
      
      axios.post('https://api.cloudinary.com/v1_1/doiglts2y/image/upload', formData1, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res)=>{
        dataSet.value.thumbnail = res.data.url;
        formData2.append("api_key", "557214385787327");
        formData1.append("upload_preset", "tgolshop");
        formData1.append("timestamp", (Date.now() / 1000) | 0);
        formData1.append(`file`, infoImage.value);
        return axios.post('https://api.cloudinary.com/v1_1/doiglts2y/image/upload', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });  
      })
      .then(res=>{
        dataSet.value.infoImage = res.data.url;
        return axios.post('/api/product/upload', dataSet.value);
      })
      .then(()=>{
        alert('상품 등록이 완료되었습니다.');
        router.go(0);
      })
      .catch(err=>{
        console.log(err);
      });
    }

    function editModal(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      editProductName.value = allProducts.value[index].productName;
      editId.value = allProducts.value[index].id;
      editProductModal.value = true;
    }

    function editPosting() {
      let editDataSet = ref({
        id : editId.value,
        productName : editProductName.value,
        beforeDiscount : beforeDiscount.value,
        productPrice : productPrice.value,
        optionData : optionData.value,
        deliverKor : deliverKor.value,
        deliverOut : deliverOut.value,
        thumbnail : '',
        infoImage : ''
      })
      const formData1 = new FormData();
      const formData2 = new FormData();
      
      formData1.append("api_key", "557214385787327");
      formData1.append("upload_preset", "tgolshop");
      formData1.append("timestamp", (Date.now() / 1000) | 0);
      formData1.append(`file`, thumbnail.value);
      
      axios.post('https://api.cloudinary.com/v1_1/doiglts2y/image/upload', formData1, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res)=>{
        editDataSet.value.thumbnail = res.data.url;
        formData2.append("api_key", "557214385787327");
        formData1.append("upload_preset", "tgolshop");
        formData1.append("timestamp", (Date.now() / 1000) | 0);
        formData1.append(`file`, infoImage.value);
        return axios.post('https://api.cloudinary.com/v1_1/doiglts2y/image/upload', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });  
      })
      .then(res=>{
        editDataSet.value.infoImage = res.data.url;
        return axios.put('/api/product/edit', editDataSet.value);
      })
      .then(()=>{
        alert('상품 수정이 완료되었습니다.');
        router.go(0);
      })
      .catch(err=>{
        console.log(err);
      });
    }

    function backEdit() {
      editProductModal.value = false;
    }

    function searchTool() {
      let selectSearch = document.getElementById('searchTool');
      selectedSearch.value = selectSearch.options[document.getElementById('searchTool').selectedIndex].value;
    }

    function selectBrand() {
      let select = document.getElementById('selectedBrand');
      selectedBrand.value = select.options[document.getElementById('selectedBrand').selectedIndex].value;
    }

    function selectDivide() {
      let select = document.getElementById('selectedDivide');
      selectedDivide.value = select.options[document.getElementById('selectedDivide').selectedIndex].value;
    }

    function inputMember(e) {
      searchMemberText.value = e.target.value;
    }

    function clickSearch() {
      if(selectedSearch.value === '' || selectedSearch.value === '0') alert('검색 분류를 선택해 주십시오');
      else {
        axios.get('/api/admin/search?type=' + selectedSearch.value + '&searchMemberText=' + searchMemberText.value)
        .then(res=>{
          if(res.data === 'not found') alert('해당하는 회원이 존재하지 않습니다.');
          else {
            searchedMember.value = res.data;
            memberInfo.value = true;
          }
        })
        .catch(err=>{
          console.log(err);
        });
      }
    }

    function clickProductSearch() {
      if(selectedDivide.value === '' || selectedDivide.value === '0') {
        alert('종류를 선택하세요');
      }
       else {
        axios.get('/api/admin/searchProduct?brand=' + selectedBrand.value + '&divide=' + selectedDivide.value)
        .then(result=>{
          searchedProducts.value = result.data;
          productsInfo.value = true;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    

    watch(beforeDiscount, (newValue, oldValue)=>{
      
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        beforeDiscount.value = oldValue;
      }
    });

    watch(productPrice, (newValue, oldValue)=>{
      
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        productPrice.value = oldValue;
      }
    });

    function clickProductEnroll() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = true;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = false;
    }

    function clickMemberControl() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = true;
      productControl.value = false;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = false;
    }

    function clickProductControl() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = true;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = false;
    }

    function clickProductEdit() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      productEdit.value = true;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = false;
      axios.get('/api/admin/allProducts')
      .then(res=>{
        allProducts.value = res.data;
      })
      .catch(err=>{
        console.log(err);
      });
    }

    function clickOrderControl() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = true;
      qna.value = false;
      personalQna.value = false;
      axios.get('/api/admin/orderData')
      .then(result=>{
        orderData.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function clickQna() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = false;
      qna.value = true;
      personalQna.value = false;
      axios.get('/api/admin/qna')
      .then(result=>{
        qnaData.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function clickPersonalQna() {
      nonMemberQna.value = false;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = true;
      axios.get('/api/admin/personalQna')
      .then(result=>{
        personalQnaData.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function clickFitting() {
      nonMemberQna.value = false;
      fittingQna.value = true;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = false;
      axios.get('/api/admin/fittingQna')
      .then(result=>{
        fittingData.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function clickNonMember() {
      nonMemberQna.value = true;
      fittingQna.value = false;
      editProductModal.value = false;
      productEdit.value = false;
      productEnroll.value = false;
      memberControl.value = false;
      productControl.value = false;
      orderControl.value = false;
      qna.value = false;
      personalQna.value = false;
      axios.get('/api/admin/nonMemberQna')
      .then(result=>{
        nonMemberQnaData.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function changePoint() {
      let data = {
        nickName : searchedMember.value.nickName,
        point : searchedMember.value.point
      }
      axios.put('/api/admin/changePoint', data)
      .then(result=>{
        alert('포인트가 수정되었습니다.');
        searchedMember.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function deleteProduct(e) {
      const nodes = [...e.target.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement);
      let productId = searchedProducts.value[index].id;
      
      axios.delete('/api/admin/deleteProduct?id=' + productId + '&brand=' + selectedBrand.value + '&divide=' + selectedDivide.value)
      .then(result=>{
        alert('삭제 완료');
        searchedProducts.value = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function selectState(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement.parentElement);
      orderData.value[index].currentState = e.target.value;
     
    }

    function changeState(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement.parentElement);
      let orderId = orderData.value[index].orderId;
      let currentState = orderData.value[index].currentState;
      if(currentState === '0') {
        alert('상태를 선택하세요');
      } else {
        let data = {
          orderId : orderId,
          currentState : currentState
        }
        axios.put('/api/admin/changeState', data)
        .then(result=>{
          alert('수정 완료');
          orderData.value[index].currentState = result.data;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function changeDeliNum(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement.parentElement);
      let orderId = orderData.value[index].orderId;
      let deliNum = orderData.value[index].deliNum;
      
      let data = {
        orderId : orderId,
        deliNum : deliNum
      }
      axios.put('/api/admin/changeDeliNum', data)
      .then(result=>{
        alert('수정 완료');
        orderData.value[index].deliNum = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function inputReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      qnaData.value[index].adminText = e.target.value;
    }

    function submitReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      let id = qnaData.value[index].id;
      let adminText = qnaData.value[index].adminText;
      let data = {
        id : id,
        adminText : adminText
      }

      axios.put('/api/admin/submitReply', data)
      .then(()=>{
        qnaData.value[index].reply = true;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function inputPersonalReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      personalQnaData.value[index].adminText = e.target.value;
    }

    function submitPersonalReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      let id = personalQnaData.value[index].id;
      let adminText = personalQnaData.value[index].adminText;
      let data = {
        id : id,
        adminText : adminText
      }

      axios.put('/api/admin/submitPersonalReply', data)
      .then(()=>{
        personalQnaData.value[index].reply = true;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function inputFittingReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      fittingData.value[index].adminText = e.target.value;
    }

    function submitFittingReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      let id = fittingData.value[index].id;
      let adminText = fittingData.value[index].adminText;
      let data = {
        id : id,
        adminText : adminText
      }

      axios.put('/api/admin/fitting/submit', data)
      .then(()=>{
        fittingData.value[index].reply = true;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function inputNonMemberReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      nonMemberQnaData.value[index].adminText = e.target.value;
    }

    function submitNonMemberReply(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let index = nodes.indexOf(e.target.parentElement.parentElement);
      let id = nonMemberQnaData.value[index].id;
      let adminText = nonMemberQnaData.value[index].adminText;
      let data = {
        id : id,
        adminText : adminText
      }

      axios.put('/api/admin/nonMemberQna/submit', data)
      .then(()=>{
        nonMemberQnaData.value[index].reply = true;
      })
      .catch(err=>{
        console.log(err);
      })
    }


    return {adminData, pw, submit, productEnroll, divide, productDivide, productPrice ,brandChoice, productName, inputProductName, inputProductPrice,
    selectThum, selectInfo, posting, selectKor, selectOut, optionNumber, addOption, optionText, optionPrice, inputOptionText, inputOptionPrice, beforeDiscount,
    inputBeforeDiscount, memberControl, searchTool, searchMemberText, inputMember, clickSearch, clickProductEnroll, memberInfo,
    searchedMember, productControl, orderControl, qna, personalQna, changePoint, clickMemberControl, clickOrderControl, clickPersonalQna, clickProductControl,
    clickQna, selectBrand, selectDivide, searchedProducts, clickProductSearch, deleteProduct, productsInfo, orderData, selectState, changeState,
    changeDeliNum, qnaData, personalQnaData, inputReply, submitReply, inputPersonalReply, submitPersonalReply, selectedDivide, clickProductEdit, productEdit,
    allProducts, editModal, editProductModal, inputEditProductName, backEdit, editPosting, editProductName, fittingQna, fittingData, clickFitting,
    inputFittingReply, submitFittingReply, nonMemberQna, nonMemberQnaData, clickNonMember, inputNonMemberReply, submitNonMemberReply};
  }
}
</script>

<style>
#admin {
  position: fixed;
  left: 40%;
  right: 40%;
  top: 40%;
}

#sidebar{
  height: 100vh !important;
}



</style>