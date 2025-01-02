# WebSocket 서버 구현 가이드

## 구현 필요 사항
1. Chat WebSocket 서버 엔드포인트 구현 (`ws://[domain]/chat`)
   - 연결 시 사용자 인증 처리 (userId query parameter 사용)
   - 실시간 메시지 송수신 처리
   - 연결 상태 관리 (connecting, connected, disconnected)
   - 재연결 로직 처리

2. 메시지 처리
   - 메시지 포맷:
     ```typescript
     {
       type: 'message' | 'chat_update',
       message?: {
         id: string;
         text: string;
         senderId: string;
         timestamp: Date;
         status: 'sent' | 'delivered' | 'read';
       },
       chat?: {
         // ChatRoom 업데이트 정보
       }
     }
     ```
   - 메시지 상태 관리 (sent → delivered → read)
   - 읽지 않은 메시지 카운트 관리

3. 성능 고려사항
   - 동시 접속자 처리
   - 메시지 큐잉 시스템
   - 오프라인 메시지 저장 및 동기화
   - 연결 상태에 따른 재시도 로직

4. 보안
   - WebSocket 연결 인증
   - 메시지 암호화
   - Rate limiting

## 테스트 필요 사항
- 연결 상태 변경 테스트
- 메시지 송수신 테스트
- 재연결 시나리오 테스트
- 대량 메시지 처리 테스트
- 오프라인 상태에서의 메시지 동기화 테스트

## 클라이언트 연동
현재 클라이언트는 ChatService (mobile/services/chat/ChatService.ts)에서 WebSocket 연결을 관리하고 있음.
서버 구현 완료 후 다음 사항 업데이트 필요:
- WebSocket 서버 URL 설정
- 실제 사용자 ID 연동
- 에러 처리 및 재연결 로직 테스트 