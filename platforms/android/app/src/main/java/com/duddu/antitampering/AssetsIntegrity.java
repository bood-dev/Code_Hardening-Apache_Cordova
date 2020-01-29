package com.duddu.antitampering;

import android.content.res.AssetManager;
import android.util.Base64;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


class AssetsIntegrity {

    private static final String MESSAGE_DIGEST_ALGORITHM = "SHA-256";
    private static final String ASSETS_BASE_PATH = "www/";

    private static final Map<String, String> assetsHashes = Collections.unmodifiableMap(
        new HashMap<String, String>(16) {{
            put("Y29yZG92YS1qcy1zcmMvYW5kcm9pZC9uYXRpdmVhcGlwcm92aWRlci5qcw==", "6b93ab749d3a38c3c1aefd24af7258ee164a7dbd59126be5ee1524951a1ea130");
            put("Y29yZG92YS1qcy1zcmMvYW5kcm9pZC9wcm9tcHRiYXNlZG5hdGl2ZWFwaS5qcw==", "af2dadc21ddb52cc372ef0aef8daefe2648ebb225f492d01e54baea5239aba32");
            put("Y29yZG92YS1qcy1zcmMvZXhlYy5qcw==", "1cf1dfae526c6be2cfddebabcb821ddc2f77fce36228d51ea4a37420ebe5d4f2");
            put("Y29yZG92YS1qcy1zcmMvcGxhdGZvcm0uanM=", "89833028f58dda9d34dba705bd4d8d6fca3afcd01e204dc4a49f8c41867ccc1f");
            put("Y29yZG92YS1qcy1zcmMvcGx1Z2luL2FuZHJvaWQvYXBwLmpz", "0409cf6e37e6723bee88c6c4250b3d6722137f140df47f00ff0e91d6615da04e");
            put("Y29yZG92YS5qcw==", "35a9ca3e962107875ab268dbf1dc83117e4e328cd7cb3480effbf045f08a4dea");
            put("Y29yZG92YV9wbHVnaW5zLmpz", "c3ad27e03693c4e98e5e4863e27c56d4940a2aab4c1e7682a3ee7c50313fc07c");
            put("Y3NzL2luZGV4LmNzcw==", "c3d8b420f641a0a6e764cb41ef6b81ac3e9c5e2922e42d72390f8c529c518f4f");
            put("aW1nL2xvZ28ucG5n", "f09987ae112bdb1fffd166190d0c8b750cafa24b8f7ffac03f4e98b9a8789de3");
            put("aW5kZXguaHRtbA==", "bbcb2cedcfb4b8f2dfcd4934fca4daa4c8e4e999a64833c63a70a218e2038a40");
            put("anMvaW5kZXguanM=", "9b9f7c7200da9e59c34dad3fb4ac21b4e2bea14b5a62cba87d58e7b95c6300a8");
            put("cGx1Z2lucy9jb3Jkb3ZhLXBsdWdpbi1hbnRpdGFtcGVyaW5nL3d3dy9BbnRpVGFtcGVyaW5nLmpz", "601e62a8ab434e8884ecf2b2bb811da79a3f3ed72d3c4bb4bc5a9e3ef1ef9b9c");
            put("cGx1Z2lucy9jb3Jkb3ZhLXBsdWdpbi1kZXZpY2Uvd3d3L2RldmljZS5qcw==", "97112d5b4294e902a43ece550abdd986c2c8037c00bb944cc59e16e22ceade01");
            put("cGx1Z2lucy9jb3Jkb3ZhLXBsdWdpbi1pcm9vdC93d3cvaXJvb3QuanM=", "f09aa24b024343fc507ad6daa5dee8222c8b0e74d253db6b890a343411e0f11a");
            put("cGx1Z2lucy9jb3Jkb3ZhLXBsdWdpbi1pcy1kZWJ1Zy93d3cvaXNEZWJ1Zy5qcw==", "dad09a4911effbf204fd7bdd0379341ca81419a4cd50f2b7386e8c3444d9dbf4");
            put("cGx1Z2lucy9jb3Jkb3ZhLXBsdWdpbi1zc2xjZXJ0aWZpY2F0ZWNoZWNrZXIvd3d3L1NTTENlcnRpZmljYXRlQ2hlY2tlci5qcw==", "15fcf461b4d34b64de73e6b9526dcc675e7c4dfefbe5cc3648ac160672cfe488");
        }}
    );

    public static JSONObject check(AssetManager assets) throws Exception {
        for (Map.Entry<String, String> entry : assetsHashes.entrySet()) {
            byte[] fileNameDecode = Base64.decode(entry.getKey(), 0);
            String fileName = new String(fileNameDecode, StandardCharsets.UTF_8);
            // Log.d("AntiTampering", fileName + " -> " + entry.getValue());
            String filePath = ASSETS_BASE_PATH.concat(fileName);
            InputStream file = assets.open(filePath);
            String hash = getFileHash(file);
            if (entry.getValue() == null || !entry.getValue().equals(hash)) {
                throw new Exception("Content of " + fileName + " has been tampered");
            }
        }
        JSONObject result = new JSONObject();
        result.put("count", assetsHashes.size());
        return result;
    }

    private static String getFileHash(InputStream file) throws IOException, NoSuchAlgorithmException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] data = new byte[16384];
        while ((nRead = file.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }
        buffer.flush();
        MessageDigest digest = MessageDigest.getInstance(MESSAGE_DIGEST_ALGORITHM);
        byte[] hashBytes = digest.digest(buffer.toByteArray());
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < hashBytes.length; i++) {
            if ((0xff & hashBytes[i]) < 0x10) {
                hexString.append("0");
            }
            hexString.append(Integer.toHexString(0xFF & hashBytes[i]));
        }
        // Log.d("AntiTampering", String(hexString));
        return new String(hexString);
    }

}
