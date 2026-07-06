export default function BoardEx() {
  return (
    <div>
      {/* Top Header */}
      <header>
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <span>🏠 oo지역아동센터에 오신 걸 환영합니다!</span>
              </td>
              <td align="right">
                <span>:: 나눔플랫폼</span>
                <span> :: 전국 지역아동센터</span>
                <span> :: 지원프로세스</span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
      <hr />

      {/* Main Layout using HTML Table to align Sidebar and Content without CSS */}
      <table width="100%" cellPadding="15" cellSpacing="0">
        <tbody>
          <tr>
            {/* Left Sidebar */}
            <td valign="top" width="220">
              {/* Logo / Image Placeholder */}
              <div>
                <img src="/favicon.svg" alt="Center Logo" width="120" />
              </div>
              <br />
              
              {/* Center Info */}
              <div>
                <strong>oo지역아동센터</strong>
                <p>
                  서울 마포구 백범로 71 숨도빌딩 8층<br />
                  (우: 04111)
                </p>
                <p>02-0000-0000</p>
                <p>
                  <strong>이용시간</strong><br />
                  학기중 : 09:00 ~ 18:00<br />
                  방학중 : 09:00 ~ 18:00<br />
                  토요일 : -
                </p>
              </div>
              <hr />

              {/* Sidebar Menu */}
              <nav>
                <strong>📁 메뉴</strong>
                <ul>
                  <li><a href="#intro">🏠 센터소개</a></li>
                  <li>
                    <strong>💬 커뮤니티</strong>
                    <ul>
                      <li><a href="#notice">공지/뉴스</a></li>
                      <li><a href="#gallery">활동사진 갤러리</a></li>
                      <li><a href="#freeboard"><font color="red">- 자유게시판</font></a></li>
                      <li><a href="#qna">질문/답변</a></li>
                      <li><a href="#archive">자료실</a></li>
                    </ul>
                  </li>
                  <li><a href="#proposal">📊 제안서</a></li>
                  <li><a href="#support">❤️ 후원 네트워크</a></li>
                </ul>
              </nav>
              <hr />

              {/* Sidebar Buttons */}
              <div>
                <button type="button">🏠 홈페이지</button>
                <button type="button">🛠️ 기술문의</button>
              </div>
              <br />
              <div>
                <button type="button">Twitter</button>
                <button type="button">Facebook</button>
                <button type="button">Blog</button>
              </div>
            </td>

            {/* Vertical Divider Line */}
            <td width="1" bgcolor="#cccccc" style={{ padding: 0 }}></td>

            {/* Right Main Content */}
            <td valign="top">
              {/* Main Title */}
              <h2>자유롭게 좋은 글을 남겨주세요.</h2>
              <br />

              {/* Post Details Table */}
              <table border="1" cellPadding="12" cellSpacing="0" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <strong>제목을 입력하세요.</strong>
                    </td>
                    <td align="right">
                      <span>작성자 홍길동</span> | 
                      <span>날짜 2017-09-19 17:07</span> | 
                      <span>조회수 2</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" height="250" valign="top">
                      내용을 입력하세요.
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />

              {/* Previous post link */}
              <div>
                <span>이전글 ▲</span>
              </div>
              <hr />

              {/* Edit and List buttons */}
              <table width="100%">
                <tbody>
                  <tr>
                    <td>
                      <button type="button">수정</button>
                    </td>
                    <td align="right">
                      <button type="button">목록보기</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />

              {/* Comments Section */}
              <h3>≡ 댓글</h3>

              {/* Mock Rich Text Editor Container */}
              <table border="1" cellPadding="8" cellSpacing="0" width="100%">
                <thead>
                  <tr bgcolor="#f0f0f0">
                    <td>
                      {/* Editor Toolbar Buttons */}
                      <button type="button">🖼️ 이미지</button>
                      <button type="button">🔗 링크</button>
                      <button type="button">📅 달력</button>
                      <button type="button">📊 테이블</button>
                      <button type="button">😊 이모지</button>
                      <button type="button">Ω 기호</button>
                      <button type="button">🌐 지도</button>
                      <span> | </span>
                      <button type="button"><strong>B</strong></button>
                      <button type="button"><em>I</em></button>
                      <button type="button"><del>S</del></button>
                      <button type="button"><u>T</u>x</button>
                      <span> | </span>
                      <button type="button">🔗 링크해제</button>
                      <button type="button">🚩 깃발</button>
                      <button type="button">⤢ 전체화면</button>
                      <button type="button">? 도움말</button>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <textarea cols="100" rows="8" defaultValue="댓글을 입력할 수 있습니다."></textarea>
                    </td>
                  </tr>
                  <tr bgcolor="#e8e8e8">
                    <td>
                      <small>body p</small>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              {/* Register comment button */}
              <div align="right">
                <br />
                <button type="button">댓글등록</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <hr />
      <footer>
        <p align="center">
          oo지역아동센터 | 서울 마포구 백범로 71 숨도빌딩 8층 (우 : 04111) <a href="#map">[지도보기]</a> | Tel : 02-0000-0000 Fax : 02-0000-0000 E-mail : icareinfo@hanmail.net
        </p>
      </footer>
    </div>
  )
}
