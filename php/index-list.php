
<?php  
	
include "conn.php";

$result=$conn->query("select * from main1");

//利用$result生成简单的接口。
// $result->num_rows   记录的条数
// $result->fetch_assoc() 获取查询到的数据，逐条获取。返回值是数组
$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();//生成二维数组
}

echo json_encode($arr);//将二维数组输出json格式


?>