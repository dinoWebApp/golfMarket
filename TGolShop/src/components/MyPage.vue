<template>
  <div class="container">
    <div v-if="outModal" align="center" class="black-bg d-none d-sm-block">
      <div class="white-bg border">
        <h4>회원탈퇴를 하시겠습니까?</h4>
        <p class="d-sm-block d-lg-none" style="font-size:15px">회원님의 모든 정보가 삭제됩니다.</p>
        <p class="d-sm-none d-lg-block" style="font-size:20px">회원님의 모든 정보가 삭제됩니다</p>
        <div align='center'>
          <button @click="outOk" class="btn btn-light btn-sm border me-2">탈퇴하기</button>
          <button @click="outNo" style="font-weight:bold;" class="btn btn-danger btn-sm ms-2">취소</button>
        </div>
      </div>
    </div>
    <div v-if="outModal" align="center" class="black-bg2 d-block d-sm-none">
      <div class="white-bg2 border">
        <h4>회원탈퇴를 하시겠습니까?</h4>
        <p  style="font-size:15px">회원님의 모든 정보가 삭제됩니다.</p>
        <div align='center'>
          <button @click="outOk" class="btn btn-light btn-sm border me-2">탈퇴하기</button>
          <button @click="outNo" style="font-weight:bold;" class="btn btn-danger btn-sm ms-2">취소</button>
        </div>
      </div>
    </div>
    <div align='left' class="mt-4">
      <h1>마이페이지</h1>
      <span style="color:darkgray">나의 주문 정보 및 개인 정보를 관리할 수 있습니다</span>
    </div>
    <hr/>

    <div class="border mt-3" v-if="updateKey === 0">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickPurchaseData" class="nav-link mypage-option active" id="purchase-data" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickCart" class="nav-link mypage-option" id="cart" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReviews" class="nav-link mypage-option" id="reviews" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">후기작성</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickPoint" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickInfo" class="nav-link mypage-option col-3" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>
    <div class="border mt-3" v-if="updateKey === 1">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickPurchaseData" class="nav-link mypage-option" id="purchase-data" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickCart" class="nav-link mypage-option active" id="cart" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReviews" class="nav-link mypage-option" id="reviews" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">후기작성</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" id="Qna" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickPoint" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickInfo" class="nav-link mypage-option col-3" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>
    <div v-if="purchaseList">
      <div class="mt-3" align="left">
        <span style="font-size: large;">결제취소, 반품은 1:1문의로 문의 부탁드립니다.</span>
      </div>  
      <div class="mt-1" align="left">
        <span style="color:darkgray">배송이 시작되면 배송조회 버튼이 활성화됩니다.</span>
      </div>  
      
      <div>
        <div>
          <hr/>
          <div class="row mt-4">
            <div class="col-5"> <h6>주문상품 및 옵션</h6></div>
            <div class="col-2"><h6>수량</h6></div>
            <div class="col-3"> <h6>상품금액</h6></div>
            <div class="col-2"><h6>상태</h6></div>
          </div>
          <div class="row" v-for="item in mypageData.purchaseData" :key="item">
            <hr/>
            <div class="col-5" align="left">
              <div class="d-none d-lg-block"> <h6>{{item.productName}}</h6> </div>
              <div class="d-block d-lg-none" style="font-size: small;"> {{item.productName}} </div>
              <div class="mb-2" style="color:darkgray; font-size: 13px;">{{item.optionText}}</div>
              <div v-if="item.deliverOut" style="color:red; font-size: 13px;">[해외직구]</div>
            </div>
            <div class="col-2">
                <div class="d-none d-lg-block mb-4"><h5> {{item.orderNum}} </h5></div>
                <div class="d-block d-lg-none mb-4"><h6> {{item.orderNum}} </h6></div>
            </div>
            
            <div class="col-3">
              <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.payPrice)}} 원</h5>  </div>
              <div class="d-block d-lg-none" style="font-weight:bold; font-size: 13px;"> {{filter(item.payPrice)}} 원 </div>
              <div v-if="item.cartBool" style="font-size: 13px;">(장바구니 결제)</div>
            </div>
            <div v-if="item.currentState !== '배송시작'" class="col-2">
              <div style="font-size: small;" class="d-block d-md-none"> {{ item.currentState }} </div>
              <div class="d-none d-md-block"> {{ item.currentState }} </div>
            </div>
            <div v-if="item.currentState === '배송시작'" class="col-2">
              <button @click="clickDeliNum" class="btn btn-light btn-sm border">조회</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div v-if="cart">
      <div>
        <div>
          <div class="row mt-4">
            <div class="col-5"> <h6>상품 및 옵션</h6></div>
            <div class="col-2"><h6>수량</h6></div>
            <div class="col-3"> <h6>상품금액</h6></div>
            <div class="col-2"><h6></h6></div>
          </div>
          <div class="row" v-for="item in mypageData.cart" :key="item">
            <hr/>
            <div class="col-5" align="left">
              <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
              <div class="d-block d-lg-none" style="font-size: small;"> {{item.productName}} </div>
              <div style="color:darkgray; font-size: 14px;">{{item.productOption}}</div>
              <div v-if="item.deliverOut" style="color:red; font-size: 13px;">[해외직구]</div>
            </div>
            <div class="col-2 d-none d-lg-block"><h5> {{item.productNum}} </h5></div>
            <div class="col-2 d-block d-lg-none"><h6> {{item.productNum}} </h6></div>
            <div class="col-3">
              <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.totalPrice)}} 원</h5>  </div>
              <div class="d-block d-lg-none" style="font-weight:bold; font-size: 13px;"> {{filter(item.totalPrice)}} 원  </div>
            </div>
            <div class="col-2">
              <button @click="deleteCart" class="btn btn-danger btn-sm">삭제</button>
            </div>
          </div>
        </div>
        
      </div>
      <hr/>
      <div class="mt-4 d-flex">
        <h3 style="color:red; font-weight:bold;">총 결제 금액:</h3>
        <h3 class="ms-3"> {{filter(totalPrice)}} 원 </h3>
        <button @click="clickPurchase" class="btn btn-danger ms-4" style="font-weight:bold;">결제하기</button>
      </div>
    </div>

    <!-- purchase detail -->
    <div v-if="purchaseDetail" class="container">
      <div class="mt-4 mb-4">
        <h1 align='left'>주문/결제</h1>
      </div>
      <hr/>
      <div class="mt-3 mb-3">
        <h4 style="font-weight:bold;" align="left">배송지 입력 (수정 가능)</h4>
      </div>
      <div class="border">
        <div class="col-5 col-lg-3 ms-1 me-1 mt-3 mb-3">
          <div align='left' class="ms-1 mb-1">성명</div>
          <input v-bind:value="mypageData.name" @input="inputName" type="text" class="form-control mb-2" id="name" placeholder="성명" maxlength="6">
          <div align='left' class="ms-1 mb-1">휴대폰 번호</div>
          <input v-bind:value="phoneNum" @input="inputPhoneNum" type="tel" class="form-control mb-2" id="phoneNum" placeholder="휴대폰 번호 (10~11자)" maxlength="11">
        </div>
        <div class="ms-1 col-11 col-lg-7 mt-3">
          <div class="d-flex">
            <div class="col-6">
              <input type="text" class="form-control mb-2" id="address-num" v-model="mypageData.addressNum" placeholder="우편번호" readonly>
            </div>
            <div class="col-auto ms-1">
              <button  type="button" class="btn btn-light border" @click="inputAddress">우편번호 찾기</button>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-9 pe-1">
              <input type="text" class="form-control mb-2" id="address1" v-model="mypageData.address" placeholder="주소"  readonly>
            </div>
            <div class="col-3 ps-1" >
              <input type="text" class="form-control mb-2" id="address3" v-model="mypageData.addressName" placeholder="" readonly>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-12">
              <input type="text" class="form-control mb-2" id="detailAddress" v-model="mypageData.detailAddress" placeholder="상세주소" maxlength="25">
            </div>
          </div>
          <div v-if="deliverOut" class="mt-2">
            <div align='left' class="ms-1 mb-1">개인통관고유부호</div>
            <input v-model="personalNum" type="text" class="form-control mb-2" id="personalNum" placeholder="개인통관고유부호" maxlength="13">
          </div>
        </div>
      </div>
      <div class="mt-4 mb-3">
        <h4 style="font-weight:bold;" align='left'>주문상품</h4>
      </div>
      <hr/>
      <div>
        <div class="row mt-4">
          <div class="col-6"> <h6>주문상품 및 옵션</h6></div>
          <div class="col-2"><h6>수량</h6></div>
          <div class="col-4"> <h6>상품금액</h6></div>
        </div>
        <div class="row" v-for="item in mypageData.cart" :key="item">
          <hr/>
          <div class="col-6">
            <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
            <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
            <div style="color:darkgray">{{item.productOption}}</div>
          </div>
          <div class="col-2 d-none d-lg-block"><h5> {{item.productNum}} </h5></div>
          <div class="col-2 d-block d-lg-none"><h6> {{item.productNum}} </h6></div>
          <div class="col-4">
            <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.totalPrice)}} 원</h5>  </div>
            <div class="d-block d-lg-none" style="font-weight:bold;"> <h6>{{filter(item.totalPrice)}} 원</h6>  </div>
          </div>
        </div>
      </div>
      <div v-if="tossModal === false">
        <div class="mt-4" align="left">
          <span>보유 중인 포인트 : {{ leavedPoint }} P</span>
        </div>
        <div class="mt-2" align="left">
          <span>사용할 포인트 : </span>
          <input v-bind:value="usePoint" @input="inputPoint" type="text">
        </div>
      </div>
      <div class="mt-2 d-flex" v-if="payMethodModal">
        <div align="left" class="me-2">
          <span>결제 방식 : </span> 
        </div>
        <div align="left">
          <select id="payMethod" @change="selectPay" aria-label="Default select example">
            <option selected value="선택">선택</option>
            <option value="무통장입금">무통장입금</option>
            <option value="일반결제">일반결제</option>
          </select>
        </div>
      </div>
      <div class="d-flex mt-4" v-if="tossModal === false">
        <h3 class="d-none d-sm-block" style="color:red; font-weight:bold;">결제 금액:</h3>
        <h6 class="d-block d-sm-none" style="color:red; font-weight:bold;">결제 금액:</h6>
        <h3 class="ms-3 d-none d-sm-block"> {{filter(leavedPrice)}} 원 </h3>
        <h5 class="ms-3 d-block d-sm-none"> {{filter(leavedPrice)}} 원 </h5>
        <button @click="clickToss" class="btn btn-danger btn-sm ms-4 d-block d-sm-none" style="font-weight:bold;">결제하기</button>
        <button @click="clickBack" class="btn btn-outline-success btn-sm flex-shrink-0 ms-1 d-block d-sm-none" style="font-weight:bold;" type="button">이전페이지</button>
        <button @click="clickToss" class="btn btn-danger d-none d-sm-block ms-4 " style="font-weight:bold;">결제하기</button>
        <button @click="clickBack" class="btn btn-outline-success d-none d-sm-block flex-shrink-0 ms-1" style="font-weight:bold;" type="button">이전페이지</button>
      </div>
      <hr/>
      <div id="payment-method"></div>
      <div class="mt-2 d-flex" v-if="tossModal">
        <h3 class="d-none d-sm-block" style="color:red; font-weight:bold;">결제 금액:</h3>
        <h5 class="d-block d-sm-none" style="color:red; font-weight:bold;">결제 금액:</h5>
        <h3 class="ms-3 d-none d-sm-block"> {{filter(leavedPrice)}} 원 </h3>
        <h5 class="ms-3 d-block d-sm-none"> {{filter(leavedPrice)}} 원 </h5>
        <button @click="clickFinal" class="btn btn-danger btn-sm ms-4 d-block d-sm-none" style="font-weight:bold;">결제하기</button>
        <button @click="backPage" class="btn btn-outline-success btn-sm flex-shrink-0 ms-1 d-block d-sm-none" style="font-weight:bold;" type="button">이전페이지</button>
        <button @click="clickFinal" class="btn btn-danger d-none d-sm-block ms-4 " style="font-weight:bold;">결제하기</button>
        <button @click="backPage" class="btn btn-outline-success d-none d-sm-block flex-shrink-0 ms-1" style="font-weight:bold;" type="button">이전페이지</button>
      </div>
    </div>

    
    
    <!-- 후기 -->
    <div v-if="reviews">
      <div>
        <div>
          <div class="row mt-4">
            <div class="col-5"> <h6>상품 및 옵션</h6></div>
            <div class="col-4"><h6>구매 날짜</h6></div>
            <div class="col-3"> <h6></h6></div>
          </div>
          <div v-for="item in mypageData.purchaseData" :key="item">
            <div v-if="item.currentState !== '입금대기'" class="row">
              <hr/>
              <div class="col-5" align="left">
                <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
                <div class="d-block d-lg-none" style="font-size: small;"> {{item.productName}} </div>
                <div style="color:darkgray; font-size: 14px;">{{item.optionText}}</div>
              </div>
              <div class="col-4 d-none d-lg-block"><h5> {{item.purchaseDate}} </h5></div>
              <div class="col-4 d-block d-lg-none"><h6> {{item.purchaseDate}} </h6></div>
              <div v-if="item.review === false" class="col-3">
                <button @click="clickReview" class="btn btn-light btn-sm border">후기작성</button>
              </div>
              <div v-if="item.review" class="col-3">
                작성완료
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <div class="mb-3" v-if="reviewWrite">
      <div class="row p-5 bg-light rounded-3 mt-3">
        <div class="row d-block d-sm-none" align="left" style="font-weight:30; font-size:18px;">
          주문하신 상품에 관한 후기를 남겨주세요.
        </div>
        <div class="row d-none d-sm-block" align="left" style="font-weight:30; font-size:23px;">
          주문하신 상품에 관한 후기를 남겨주세요.
        </div>
        <li class="row mb-1" style="color:darkgray">
          ({{ reviewProductName }})
        </li>
        <li class="row mb-4" style="color:darkgray">
          리뷰 작성 시 300포인트 지급
        </li>
        <div align="left" class="col-4 mb-1 d-block d-sm-none">
          평점:
          <select @change="selectGrade" name="grade">
            <option value="5" selected="selected">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div align="left" class="col-3 mb-1 d-none d-sm-block">
          평점:
          <select @change="selectGrade" name="grade">
            <option value="5" selected="selected">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div class="row">
          <textarea v-bind:value="reviewText" @input="inputReview" class="col-10" id="qna" cols="30" rows="3"></textarea>
          <button @click="reviewSubmit" class="btn btn-secondary btn-sm col-2" style="font-weight:bold;">등록</button>
        </div>
        <div align="left">
          <span>{{ reviewText.length }}/100</span>
        </div>
        
      </div>
    </div>
    <div class="mb-3 container" v-if="qnaWrite">
      <div class="row p-5 bg-light rounded-3 mt-3">
        <div align="left" class="row" style="font-weight:30; font-size:17px;">
          상품 관련 문의 사항을 작성해주십시오.
        </div>
        <li class="row mb-4" style="color:darkgray">
          100자 이내로 작성
        </li>
        <div class="row">
          <textarea v-bind:value="qnaText" @input="inputQna" class="col-12 d-block d-sm-none" id="qna" cols="30" rows="3"></textarea>
          <textarea v-bind:value="qnaText" @input="inputQna" class="col-10 d-none d-sm-block" id="qna" cols="30" rows="3"></textarea>
          <button @click="qnaSubmit" class="btn btn-secondary btn-sm col-2 d-none d-sm-block" style="font-weight:bold;">등록</button>
        </div>
        <div align="right" class="mt-1 d-block d-sm-none">
          <span>{{ qnaText.length }}/100</span>
          <button @click="qnaSubmit" class="btn btn-secondary btn-sm col-2 me-2 ms-1" style="font-weight:bold;">등록</button>
        </div>
        <div align="left" class="d-none d-sm-block">
          <span>{{ qnaText.length }}/100</span>
        </div>
        
      </div>
      
      
      <div v-for="item in qnaList" :key="item" align='left'>
        <hr/>
        <div>
          <span> 작성자 : {{item.nickName}}</span>
          <span style="font-size:12px" class="ms-2">{{item.date}} </span>
        </div>
        <div class="mt-3">
          {{item.text}}
        </div>
        <div style="color:red;" v-if="item.reply === false" class="mt-3">
          답변 미등록
        </div>
        <div style="font-weight:bold;" v-if="item.reply" class="mt-3">
          관리자의 답변: {{item.adminText}}
        </div>
      </div>
    </div>
    <div class="mb-3" v-if="point">
      <div class="row p-5 bg-light rounded-3 mt-3">
        <span><h3>보유 중인 포인트 : <span style="color:red">{{ mypageData.point }}</span> P</h3></span>
      </div>
    </div>
    <div v-if="info" class="border">
      <div class="col-5 col-lg-3 ms-1 me-1 mt-3 mb-3">
        <div align='left' class="ms-1 mb-1">성명</div>
        <input v-bind:value="changeData.name" @input="changeName" type="text" class="form-control mb-2" placeholder="성명" maxlength="6">
        <div align='left' class="ms-1 mb-1">휴대폰 번호</div>
        <input v-bind:value="changePn" @input="changePhoneNum" type="tel" class="form-control mb-2" placeholder="휴대폰 번호 (10~11자)" maxlength="11">
      </div>
      <div class="ms-1 col-11 col-lg-7 mt-3">
        <div class="d-flex">
          <div class="col-6">
            <input type="text" class="form-control mb-2"  v-model="changeData.addressNum" placeholder="우편번호" readonly>
          </div>
          <div class="col-auto ms-1">
            <button  type="button" class="btn btn-light border" @click="changeAddress">우편번호 찾기</button>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-9 pe-1">
            <input type="text" class="form-control mb-2" id="address1" v-model="changeData.address" placeholder="주소"  readonly>
          </div>
          <div class="col-3 ps-1" >
            <input type="text" class="form-control mb-2" id="address3" v-model="changeData.addressName" placeholder="" readonly>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-12">
            <input type="text" class="form-control mb-2" id="changeDetailAddress" v-model="changeData.detailAddress" placeholder="상세주소" maxlength="25">
          </div>
          
        </div>
      </div>
      <div align="left" class="ms-1">
        <button @click="clickChange" style="font-weight: bold;" class="btn btn-success mt-2 mb-2">변경하기</button>
        <button @click="clickOut" style="font-weight: bold;" class="btn btn-danger mt-2 mb-2 ms-1">회원탈퇴</button>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter} from 'vue-router'
import axios from 'axios';
import { watch } from 'vue';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk'
export default {
  name: 'MyPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const paymentMethod = ref(null);
    let paymentWidget = ref(null);
    let nickName = ref(route.query.nickName);
    let mypageData = ref({});
    let deliverOut = ref(false);
    let phoneNum = ref('');
    let updateKey = ref(0);
    let purchaseList = ref(true);
    let cart = ref(false);
    let qna = ref(false);
    let point = ref(false);
    let info = ref(false);
    let reviews = ref(false);
    let totalPrice = ref(0);
    let purchaseDetail = ref(false);
    let reviewProductId = ref();
    let reviewOrderId = ref();
    let reviewProductName = ref('');
    let qnaWrite = ref(false);
    let reviewWrite = ref(false);
    let outModal = ref(false);
    let reviewText = ref('');
    let reviewLength = ref(0);
    let reviewGrade = ref(5);
    let qnaText = ref('');
    let qnaList = ref([]);
    let changeData = ref({
      name : '',
      phoneNum : '',
      addressNum : '',
      address : '',
      addressName: '',
      detailAddress : ''
    });
    let changePn = ref('');
    let leavedPoint = ref(0);
    let leavedPrice = ref(0);
    let usePoint = ref(0);
    let tossModal = ref(false);
    let payMethod = ref('선택');
    let payMethodModal = ref(true);
    let personalNum = ref('');
   


    axios.get('/api/customer/mypage?nickName=' + route.query.nickName)
    .then(res=>{
      if(res.data === 'not login') {
        alert('로그인이 필요합니다.');
        router.push({path : '/'});
      } else {
        mypageData.value = res.data;
        phoneNum.value = res.data.phoneNum;
        qnaList.value = res.data.qna;
        changeData.value.name = res.data.name;
        changePn.value = res.data.phoneNum;
        changeData.value.addressNum = res.data.addressNum;
        changeData.value.address = res.data.address;
        changeData.value.addressName = res.data.addressName;
        changeData.value.detailAddress = res.data.detailAddress;
        changeData.value.phoneNum = res.data.phoneNum;
        leavedPoint.value = res.data.point;
        if(route.query.cart === '1') {
          purchaseList.value = false;
          cart.value = true;
          reviews.value = false;
          qna.value = false;
          point.value = false;
          info.value = false;
          updateKey.value++;
        }
        for(let i = 0 ; i < res.data.cart.length; i++) {
          if(res.data.cart[i].deliverOut) {
            deliverOut.value = true;
          }
          totalPrice.value += res.data.cart[i].totalPrice;
          leavedPrice.value += res.data.cart[i].totalPrice;
        }
      }
    })
    .catch(err=>{
      console.log(err);
    })

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    function clickPurchaseData() {
      reviewWrite.value = false;
      qnaWrite.value = false;
      purchaseDetail.value = false;
      purchaseList.value = true;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }


    function clickCart() {
      reviewWrite.value = false;
      qnaWrite.value = false;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = true;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function clickReviews() {
      reviewWrite.value = false;
      qnaWrite.value = false;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = false;
      reviews.value = true;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function clickQna() {
      reviewWrite.value = false;
      qnaWrite.value = true;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = true;
      point.value = false;
      info.value = false;
    }

    function clickPoint() {
      reviewWrite.value = false;
      qnaWrite.value = false;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = true;
      info.value = false;
    }


    function clickInfo() {
      reviewWrite.value = false;
      qnaWrite.value = false;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = true;
    }

    function clickPurchase() {
      if(totalPrice.value === 0) {
        alert('결제할 상품이 없습니다.');
      } else {
        reviewWrite.value = false;
        qnaWrite.value = false;
        purchaseDetail.value = true;
        purchaseList.value = false;
        cart.value = false;
        reviews.value = false;
        qna.value = false;
        point.value = false;
        info.value = false;
      }
    }

    function clickBack() {
      reviewWrite.value = false;
      qnaWrite.value = false;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = true;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function inputName(e) {
      mypageData.value.name = e.target.value;
    }

    function inputPhoneNum(e) {
      phoneNum.value = e.target.value;
    }

    watch(phoneNum, (newValue, oldValue)=>{
      
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        phoneNum.value = oldValue;
      }
    });

    function inputAddress() {
      new window.daum.Postcode({
        oncomplete: function(data) {
          let addr = '';
          let extraAddr = '';
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }

            if(data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if(extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }

            mypageData.value.addressName = extraAddr;
          } else {
            mypageData.value.addressName = '';
          }

          mypageData.value.addressNum = data.zonecode;
          mypageData.value.address = addr;
          document.getElementById('detailAddress').focus();
        }
      }).open();
    }

    function deleteCart(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let cartIndex = nodes.indexOf(e.target.parentElement.parentElement) - 1;
      let cartId = mypageData.value.cart[cartIndex].cartId;
      axios.delete('/api/customer/mypage/deleteCart?nickName=' + nickName.value
      + '&cartId=' + cartId)
      .then(result=>{
        totalPrice.value -= mypageData.value.cart[cartIndex].totalPrice;
        
        mypageData.value.cart = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function inputPoint(e) {
      usePoint.value = e.target.value;
      leavedPoint.value = mypageData.value.point - e.target.value;
      leavedPrice.value = totalPrice.value - e.target.value;
    }
    watch(usePoint, (newValue, oldValue)=>{
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        usePoint.value = oldValue;
        leavedPoint.value = mypageData.value.point - oldValue;
        leavedPrice.value = totalPrice.value - oldValue;
      } else if(newValue > mypageData.value.point) {
        alert('보유한 포인트까지만 사용가능합니다.');
        usePoint.value = oldValue;
        leavedPoint.value = mypageData.value.point - oldValue;
        leavedPrice.value = totalPrice.value - oldValue;
      }
    });
    function selectPay() {
      let numberSelect = document.getElementById('payMethod');
      payMethod.value = numberSelect.options[document.getElementById('payMethod').selectedIndex].value;
    }
    function clickToss() {
      if(payMethod.value === '선택') {
        alert('결제 방식을 선택해 주십시오.');
      } else if(payMethod.value === '무통장입금') {
        if(
          mypageData.value.name === '' ||
          phoneNum.value === '' ||
          mypageData.value.addressNum === '' ||
          mypageData.value.address === '' ||
          mypageData.value.detailAddress === ''
        ) alert('배송지 정보를 모두 입력해 주십시오.');
        else if(deliverOut.value === true && personalNum.value === '') alert('해외직구 상품 주문 시 개인통관고유부호를 필히 입력하셔야 합니다.');
        else {
          
          let date = new Date()
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let hour = date.getHours();
          let minuite = date.getMinutes();
          let second = date.getSeconds();
          let orderId = year.toString() 
            + (("00" + month.toString()).slice(-2)) 
            + (("00" + day.toString()).slice(-2))
            + (("00" + hour.toString()).slice(-2)) 
            + (("00" + minuite.toString()).slice(-2)) 
            + (("00" + second.toString()).slice(-2));
          
          let purchaseInfo = [];
          
          for(let i = 0; i < mypageData.value.cart.length; i++) {
            purchaseInfo.push({
              cartBool : true,
              nickName : mypageData.value.nickName,
              name : mypageData.value.name,
              phoneNum :phoneNum.value,
              addressNum : mypageData.value.addressNum,
              address : mypageData.value.address,
              addressName : mypageData.value.addressName,
              detailAddress : mypageData.value.detailAddress,
              productName : mypageData.value.cart[i].productName,
              productId : mypageData.value.cart[i].productId,
              orderNum : mypageData.value.cart[i].productNum,
              optionText : mypageData.value.cart[i].productOption,
              totalPrice : mypageData.value.cart[i].totalPrice,
              payPrice : leavedPrice.value,
              payMethod : payMethod.value,
              orderId : orderId,
              personalNum : personalNum.value,
              deliverOut : mypageData.value.cart[i].deliverOut,
              cartId : mypageData.value.cart[i].cartId, 
              leavedPoint : leavedPoint.value
            });
          }
          
          
            
          axios.post('/api/product/cartPurchase', purchaseInfo)
          .then(()=>{
            router.push({name: 'PurchaseComplete', query : {payMethod : payMethod.value, price : leavedPrice.value, cashOrderId : orderId}});
          })
          .catch(err=>{
            console.log(err);
          })
        }
        
      } else if(payMethod.value === '일반결제') {
        payMethodModal.value = false;
        tossModal.value = true;
        loadPaymentWidget(process.env.VUE_APP_CLIENT_KEY, mypageData.value.id)
        .then(payment=>{
          paymentWidget.value = payment;
          paymentWidget.value.renderPaymentMethods('#payment-method', leavedPrice.value);
        })
        .catch(err=>{
          console.log(err);
        });
      }
    }

    function clickFinal() {
      if(
        mypageData.value.name === '' ||
        phoneNum.value === '' ||
        mypageData.value.addressNum === '' ||
        mypageData.value.address === '' ||
        mypageData.value.detailAddress === ''
      ) alert('배송지 정보를 모두 입력해 주십시오.');
      else if(deliverOut.value === true && personalNum.value === '') alert('해외직구 상품 주문 시 개인통관고유부호를 필히 입력하셔야 합니다.');
      else {
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minuite = date.getMinutes();
        let second = date.getSeconds();
        let orderId = year.toString() 
          + (("00" + month.toString()).slice(-2)) 
          + (("00" + day.toString()).slice(-2))
          + (("00" + hour.toString()).slice(-2)) 
          + (("00" + minuite.toString()).slice(-2)) 
          + (("00" + second.toString()).slice(-2));
        
        let purchaseInfo = [];
        
        for(let i = 0; i < mypageData.value.cart.length; i++) {
          purchaseInfo.push({
            cartBool : true,
            nickName : mypageData.value.nickName,
            name : mypageData.value.name,
            phoneNum :phoneNum.value,
            addressNum : mypageData.value.addressNum,
            address : mypageData.value.address,
            addressName : mypageData.value.addressName,
            detailAddress : mypageData.value.detailAddress,
            productName : mypageData.value.cart[i].productName,
            productId : mypageData.value.cart[i].productId,
            orderNum : mypageData.value.cart[i].productNum,
            optionText : mypageData.value.cart[i].productOption,
            totalPrice : mypageData.value.cart[i].totalPrice,
            payPrice : leavedPrice.value,
            payMethod : payMethod.value,
            orderId : orderId,
            personalNum : personalNum.value,
            deliverOut : mypageData.value.cart[i].deliverOut,
            cartId : mypageData.value.cart[i].cartId, 
            leavedPoint : leavedPoint.value
          });
        }
        let data = 'info=' + encodeURIComponent(JSON.stringify(purchaseInfo));

        const redirectUrl = process.env.VUE_APP_TGOLSHOP + '/product/submit?' + data;

        paymentWidget.value.requestPayment({
          orderId: orderId,
          orderName: purchaseInfo[0].productName + ' 외',
          successUrl: redirectUrl,
          failUrl: process.env.VUE_APP_TGOLSHOP + '/product/submitFail',
          customerName: mypageData.value.name
        });
      }
    }

    function backPage() {
      router.go(0);
    }

    function clickDeliNum(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let cartIndex = nodes.indexOf(e.target.parentElement.parentElement) - 2;
      let deliNum = mypageData.value.purchaseData[cartIndex].deliNum;
      if(deliNum === 0) {
        alert('아직 운송장 정보가 등록되지 않았습니다.');
      } else {
        window.open('https://www.ilogen.com/m/personal/trace/' + deliNum);
      }
    }

    function clickReview(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.parentElement.children];
      let cartIndex = nodes.indexOf(e.target.parentElement.parentElement.parentElement) -1;
      
      reviewOrderId.value = mypageData.value.purchaseData[cartIndex].orderId;
      reviewProductId.value = mypageData.value.purchaseData[cartIndex].productId;
      reviewProductName.value = mypageData.value.purchaseData[cartIndex].productName;

      reviewWrite.value = true;
      purchaseDetail.value = false;
      purchaseList.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    

    function inputReview(e) {
      if(e.target.value.length <= 100) {
        reviewText.value = e.target.value;
      } else {
        alert('100자 이내로 입력하시기 바랍니다.');
        e.target.value = reviewText.value;
      }
    }

    function reviewSubmit() {
      if(reviewText.value === '') {
        alert('후기 내용을 작성해주십시오.');
      } else {
          let reviewData = {
          nickName : nickName.value,
          text : reviewText.value,
          star : reviewGrade.value,
          productId : reviewProductId.value,
          orderId : reviewOrderId.value
        }
        axios.put('/api/customer/mypage/reviewSubmit', reviewData)
        .then(()=>{
          alert('후기가 등록되었습니다.');
          router.go(0);
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function selectGrade(e) {
      reviewGrade.value = e.target.value;
      
    }

    function inputQna(e) {
      if(e.target.value.length <= 100) {
        qnaText.value = e.target.value;
      } else {
        alert('100자 이내로 입력하시기 바랍니다.');
        e.target.value = qna.value;
      }
    }

    function qnaSubmit() {
      if(qnaText.value === '') {
        alert('문의 내용을 입력해주십시오.');
      } else {
          let qnaData = {
          nickName : nickName.value,
          text : qnaText.value
        }
        axios.post('/api/customer/mypage/personalQna', qnaData)
        .then((result)=>{
          qnaText.value = '';
          alert('등록되었습니다.');
          qnaList.value = result.data;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function changeName(e) {
      changeData.value.name = e.target.value;
    }

    function changePhoneNum(e) {
      changePn.value = e.target.value;
      changeData.value.phoneNum = e.target.value;
    }

    watch(changePn, (newValue, oldValue)=>{
      
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        changePn.value = oldValue;
      }
    });

    function changeAddress() {
      new window.daum.Postcode({
        oncomplete: function(data) {
          let addr = '';
          let extraAddr = '';
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }

            if(data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if(extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }

            changeData.value.addressName = extraAddr;
          } else {
            changeData.value.addressName = '';
          }

          changeData.value.addressNum = data.zonecode;
          changeData.value.address = addr;
          document.getElementById('changeDetailAddress').focus();
        }
      }).open();
    }

    function clickChange() {
      if(
        changeData.value.name === '' ||
        changeData.value.phoneNum === '' ||
        changeData.value.addressNum === '' ||
        changeData.value.address === '' ||
        changeData.value.detailAddress === ''
      ) alert('정보를 모두 입력해 주십시오.');
      else {
        axios.put('/api/customer/mypage/changeData', changeData.value)
        .then(()=>{
          alert('변경이 완료되었습니다.');
          router.go(0);
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function clickOut() {
     outModal.value = true;
    }

    function outOk() {
      axios.delete('/api/customer/out?nickName=' + nickName.value)
      .then(()=>{
        alert('회원탈퇴가 성공적으로 이루어졌습니다.');
        router.replace({path : '/'});
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function outNo() {
      outModal.value = false;
    }

    
    
  
    return {nickName, updateKey, purchaseList, cart, mypageData, filter, reviews, qna, point, info, clickPurchaseData,
    clickCart, clickReviews, clickQna, clickPoint, clickInfo, totalPrice, deleteCart, clickPurchase, purchaseDetail, inputName, inputPhoneNum,
    inputAddress, clickFinal, clickBack, clickDeliNum, clickReview, phoneNum, qnaWrite, reviewWrite, reviewProductName, reviewText, reviewLength,
    inputReview, reviewSubmit, selectGrade, qnaText, inputQna, qnaSubmit, qnaList, changeName, changePhoneNum, changeData, changeAddress, changePn,
    clickChange, leavedPoint, leavedPrice, usePoint, inputPoint, clickOut, outModal, outOk, outNo, tossModal, payMethod, payMethodModal, selectPay,
    clickToss, paymentMethod, backPage, personalNum, deliverOut};
  }
}
</script>

<style>
.mypage-option {
  font-size: 15px !important;
  padding: 5px !important;
}

.black-bg {
  width: 100%; height:100%;
  position: fixed; padding: 20px;
}
.white-bg {
  z-index: 8;
  width: 50%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.black-bg2 {
  width: 100%; height:100%;
  position: fixed; padding: 20px;
}
.white-bg2 {
  z-index: 8;
  width: 80%; background: white;
  border-radius: 8px;
  padding: 20px;
} 
</style>