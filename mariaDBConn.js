const mariadb = require('mariadb');
require('dotenv').config({ path:'.env'});

const pool = mariadb.createPool({
    host: 'localhost', port: 3306,
    user: process.env.admin , password: process.env.passwd,
    connectionLimit: 5
});

async function CreateUser(user_data) {
    let conn;
    try {
        conn = await pool.getConnection();
        conn.query('USE o2');
        // 입력할 컬럼수 밸류값(?,?,?)으로 주고 두번째 인자로 배열형태로 변수로 전달
        conn.query('INSERT INTO user VALUES(?,?,?)', user_data);
    } catch (err) {
        throw err;
    } finally {
        if(conn) conn.end();        
    }
}

async function GetUser(user_id) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        conn.query('USE o2');
        rows = await conn.query(`SELECT password From user WHERE id='${user_id}'`);        
    } catch (err) {
        throw err;
    } finally {
        if(conn) conn.end();        
        return rows[0].password;
    }
}

async function CreateTopic(topic){
    let conn;
    try {
        conn = await pool.getConnection();
        conn.query('USE o2');
                           // 자동 증가 값인 id 는 아래처럼 처리
        conn.query('INSERT INTO topic VALUES(id,?,?,?)', topic);
    } catch (err) {
        throw err;
    } finally {
        if(conn) conn.end();        
    }
}

async function GetTopics() {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        conn.query('USE o2');
        rows = await conn.query('SELECT * From topic')
    } catch {
        throw err;
    } finally {
        if(conn) conn.end();
        return rows;
    }
}

async function UpdateTopics(topic) {
    let conn;
    try {
        conn = await pool.getConnection();
        conn.query('USE o2');
        conn.query('UPDATE topic SET title=?,description=?,author=? WHERE id=?', topic)
    } catch {
        throw err;        
    } finally {
        if(conn) conn.end();
    }
}

async function DeleteTopics(topic_id) {
    let conn;
    try {
        conn = await pool.getConnection();
        conn.query('USE o2');
        conn.query('DELETE FROM topic WHERE id=?', topic_id);
    } catch {
        throw err;
    } finally {
        if(conn) conn.end();
    }
}

module.exports = {
    getUser: GetUser,
    getTopics: GetTopics,
    createUser: CreateUser,
    createTopic: CreateTopic,
    updateTopic: UpdateTopics,
    deleteTopics: DeleteTopics
}

/*  미해결 문제
   1. topic의 id 값이 비 순차적으로 넘어갈 때 데이터 인덱스 값 과 매치가 안되어 에러 발생
   2. 로그인시 DB에 없는 사용자 ID로 로그인하게 되면 에러 발생
   2-1. 아이디 틀릴때 or 비밀번호 틀릴때 리다이렉션이 아닌 메시지 뜨게 하기  
   3. 라우터 사용시 404페이지 구현
   */