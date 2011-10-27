package com.ithinkgo.pads.common;

/**
 * 方便使用SpringSide3开发的一些工具类
 * 
 * @author yangq(qi.yang.cn@gmail.com)
 */
public class SS3Tools {

	/** ids转换为长整形数组 ids是多个id拼接的字符串，id之间分割符与前台约定为',' */
	public static Long[] ids2LongArray(final String ids) {
		/** 如果字符串数组为空或者长度为0，则返回一个长度为0的长整形数组 */
		if (ids == null || ids.length() <= 0) {
			return new Long[0];
		} else {
			String[] tmp = ids.split(",");
			Long[] array = new Long[tmp.length];
			for (int i = 0; i < tmp.length; i++) {
				array[i] = Long.parseLong(tmp[i]);
			}
			return array;
		}
	}

	/** 测试 */
	public static void main(String[] args) {
		Long[] test = SS3Tools.ids2LongArray("1,2");
		System.out.println(test.length + "," + test[0] + "," + test[1]);
	}
}
