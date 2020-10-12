<?php  
	// //1.连接数据库--mysql_connect(主机名,用户名,密码);
	// header('content-type:text/html;charset=utf-8');
	// define('HOST','localhost');
	// define('USERNAME','root');
	// define('PASSWORD','');//密码是自己数据库的密码。
	// $conn=@mysql_connect(HOST,USERNAME,PASSWORD);//@:简单的容错处理。
	// if(!$conn){
	// 	die('数据库连接失败'.mysql_error());
	// 	//退出并返回括号里面的内容  mysql_error():报错信息。
	// }

	// //2.选择数据库,设置字符集
	// mysql_select_db('kaola');
	// mysql_query('set names utf8');
	//1.设置字符编码
	header('content-type:text/html;charset=utf-8');
	
	//2.数据库连接
	define('HOST', 'localhost'); //主机名
	define('USERNAME', 'root'); //用户名
	define('PASSWORD', ''); //密码，如果没有密码，直接设为空define('PASSWORD', '');
	define('DBNAME', 'kaola'); //数据库的名称
	$conn = @new mysqli(HOST, USERNAME, PASSWORD, DBNAME);
	if ($conn->connect_error) {
		die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
	}
	
	$conn->query('SET NAMES UTF8');
	
