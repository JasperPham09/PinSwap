import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const ExplorePage = () => {
  const theme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }]}>
      <Text style={[styles.title, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>LÝ THUYẾT PIN ĐIỆN</Text>
      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
      I. CẶP OXI HÓA – KHỬ
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        
- Cặp oxi hóa khử là tập hợp gồm hai chất, chất oxi hóa và chất khử tương ứng (chất oxi hóa và chất khử liên hợp), trong đó chất oxi hóa được đặt phía trước, chất khử tương ứng đặt phía sau và cách nhau bằng một gạch dọc (Ox/Kh).
VD: Fe2+/Fe, Ag+/Ag, Al3+/Al, 2H+/H2, Cl2/2Cl-, Fe3+/Fe2+, Cu2+/Cu, Cl2/2Cl-.
- Trong một cặp oxi hóa khử thì độ mạnh của chất oxi hóa và của chất khử ngược nhau. Nghĩa là nếu chất oxi hóa rất mạnh thì chất khử tương ứng sẽ rất yếu và ngược lại, nếu chất khử rất mạnh thì chất oxi hóa tương ứng sẽ rất yếu.
VD:
+ Với cặp K+/K thì do K có tính khử rất mạnh nên K+ có tính oxi hóa rất yếu.
+ Với cặp Au3+/Au thì do Au có tính khử rất yếu nên Au3+ có tính oxi hóa rất mạnh.

      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
      II. ĐIỆN CỰC
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
      - Hệ gồm một tấm kim loại nhúng trong dung dịch một muối của kim loại đó được gọi là điện cực.
+ Sơ đồ điện cực:  
+ Phản ứng điện cực: Mn+ + ne   M
VD: Thanh kẽm tiếp xúc dung dịch ZnSO4
•	Sơ đồ điện cực:  
•	Phản ứng điện cực: Zn2+ + 2e   Zn

      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
      III. THẾ ĐIỆN CỰC
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        Visit a pin swap location and ask the staff to assist you with swapping your batteries. Make sure to bring
        your old batteries for recycling!
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
      IV. DÃY ĐIỆN HÓA
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        We support a wide range of battery types, including AA, AAA, C, D, and 9V. Check the location details to
        see which battery types are available at each location.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
      V. NGUYÊN TỐ ĐIỆN HÓA
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        We are committed to environmental sustainability. All collected batteries are recycled responsibly.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>
        LIÊN HỆ VỚI CHÚNG TÔI
      </Text>
      <Text style={[styles.content, { color: theme === 'light' ? Colors.light.secondary : Colors.dark.secondary }]}>
        If you have any questions or feedback, please contact us at support@pinswap.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default ExplorePage;