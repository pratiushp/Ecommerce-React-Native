import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  colors,
  defaultStyle,
  formHeading,
  inputOptions,
} from "../../Styles/style";
import Header from "../../Components/Header";
import Loader from "../../Components/Loader";
import { Button, TextInput } from "react-native-paper";
import { inputStyling } from "./../../Styles/style";
import SelectComponent from "../../Components/SelectComponent";

const UpdateProduct = ({ navigation, route }) => {
  const loading = false;
  const loadingOther = false;

  const images = [
    {
      url: "data:image/jpeg;base64,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",
      id: "sdfd",
    },
    {
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEhUSExMVFhUXGBIWFxcVGBcYFRgXGBUWFxYYFxgaHSggGBolGxYVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0mHSUxMC0tListLS0tLi8tLS0vLS0tLS0rLS01LS0tLS0rLSstLS0tLy0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAEDBQYHAgj/xABGEAACAQIBCAUHCgQEBwAAAAAAAQIDESEEBRIxQVFhcQaBkbHBBxMicqHR8BQjMjNCUmKSorIkguHxFkRTwhUXQ2Nzo9L/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QAMhEBAAIBAgMGAwgCAwAAAAAAAAECAwQRITFBBRIiMlFhE3GBFCORobHB4fBi0RUzQv/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQqucoRko67tJtald26zm16180vYiZ5JoAOngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWq9eMFeT975EfLcvUMFjL2Ln7jC+dc56Um2+PPVwKefV1p4a8ZTY8M24zySsry9zVtS3besx9WWF92PY7l5YIj1FdNcGZN8lrW3tK3WsRG0NvBrWSZ/q/bpxeGuLa77kitnxuyUXG+149hsfbMW2+6p8C+7M1a0Yq8nYi0c4KVRQSwak77cLbOsxM6ulji+ZIzSr1r7oS9so+4gprLZMkRXhDqcMVrvLOAA0VcAAAAAAAAAAAAAAAAAAAAAAAAMHnjO9n5um8ftS3cFx47O7K5dJqnNrBqMmuxmlUtvB2KOtzWpHdr1WNPji07yyCeHxvFN2b6i3paj3bvMhcldbuiPULiewszZzMuYWs25QpR5OUXzjJx8L9ZPvgjWMz135zKofcrtLlOlSn3zZmY1cSbJMVtt/eMbvYjeN1zK6rpyW5/wBnb2GXzC9Kc5fhgvbJmvZynfQ4X+PYbB0Wj6E3vaXYS6ON80SizcKSzgANxRAAAAAAAAAAAAAAAAAAAAAAAARs4v5qp6k/2s1ClDB78WbdnX6mp6ku41WhLFmV2hbjELmmjhMqS9xIuWprUepszliRyxLNSRWTuyPNnEybMLkFS2V5XHa/k8/zQlC/6DLqdjCQjbL6r+9Qyf8ATUrLukjK1GS5ecT7R+mxTl+L1WldLn4M27o1H5m+9vuRpVSWMcL4u73ei8e5dZvWYI2oQ5FvQR959EGo8rIgA2VIAAAAAAAAAAAAAAAAAAAAAAABDzu/manqs1WD+Oo2jPTtQnyXejUk7GR2j54+S9pY8MpKZ5kzzfBCUjPlYeZbyxWe3YXG7/HeWXJWscDGNr5YuNCf6asP/snzhiY6uv4qk/8AtV49s6L/ANpkoy+Pj4xJbTwj5fvLyOqPVvpRxwWlfswOgZojajBcPE55VgtKLvjadlwvC/Zh2nR8hVqcF+GPcX+zo8Uz7furankkAA1lMAAAAAAAAAAAAAAAAAAAAAAABjekL+YlxcF+uJqjTTNo6RytSXGcF4+Bq9XXHrMbtD/tj5L+l8i9fApPE86WBXTKCwtcS3P44nub1kec8Tl4h5V9bSf/AJF2wvb9JKhIh5Y7ypvdN+2nURLisF1LwOp5QRDy2nOKtj4NpW9h0jJ1aMVwXcc6pO9SK2ejjxcndfG86QkanZseb6Kmq6KgA1FQAAAAAAAAAAAAAAAAAAAAAAABhOlc7U4cai/ZN+Br7eK5X7zN9MX83TX42/0v3muufpLl3XMTXT960dNHgXZ03sd0eNI9TqXRZlPn3dpSlOpKoWJuxWoy1pHA8ZQ/o7bSXtTXiQM5Z4nRyzJcmUYuNfz2k3fSWhG60Sa8bL8UcObRby2tSjlGTRnSUqk3WVOo7aVPRp6UrNq+KVsCXHtvxjfhP6OZ5Mnk9P5+H8uH5m/A6Mc6ofXR5eEjokXgaXZs8LfRU1XOFQAaioAAAAAAAAAAAAAAAAAAAAAAAA1vpliqceFR9mj7zWZyxXPw+EbB0uqfOQjui32trwNcq4X3+7UYWsnfNLT08fdwkt7e3DmWm7Bstz4/0KcpirK25lmL3W5Hqct7x4EZSeu114HIvxSuua/ciTVjazlFYana+vXZ9pHh7rcr/HYToyXt1XvvPZIWsll89fd4q3idEyZ3hF/hj3HPckXzz9Vd0dxv+QP5uHqx7jV7O6qWq6JAANVTAYPpHnZ015qDtUksZK14J4XV8NLdyNKeaacsZ6VWV9dac6rxxw05O3UU82tx457vOU+PT2vG7qIOfVc51aSpwVRuFRxTxd4YTwi74YxSJNGbeuTfNtnGTXRTbevN1XTzbq3e4uagkrPezzKK1+wi/wCS/wAfz/h79l925A1elDC3As18unSnTjGT9LTcvUjB3eOr0nDHiSY9fFp27rm2DaObbrg0nLc20a8lKrCNSSuoykryWv6MtaWDesl5lj8llhUqypy+zOpKpGP4oubbS4J24EldZXfa0THTfp+LmcM9JbWCiZUuIQAAAAAAAGm9K3/ELhCC9s34mKrwbZkOkmOUz4KC/SveYys/DvPn9RO+W3zauHyQVHZa7f27yLJ316uvcXIS2N/22nidJy369vuZVlKtqp1LhiNfP26jxJW+lh8alhY9Rljtt4chDyXqjLZblvJEW9fq8L8+JGWDLkJW1atmz41CSErNbvVk77Ld2o3/ADX9VDkc+zRK9Sb2NR6joGafqocn3s1ez+f99lPVJZbr1VCMpydlFOT5JXZcNd6b5XoUFTWupJR/lXpS8F1mjlv3KTb0VaV71ohrmUedradZRbcry1q+GCSxvha3USa2U06+j5iF9cpNJR0U42UW3bar2MXSy6rCOgqujC9r2SaUpY+k9STb5EzK6HmJwVGTheMoyV1JNQcbNp3+88eJn4vhzitPT/1/CzfvxeI69EXO0kqcm1Z05Qm16jjN47fRt2mWjC3LZyOf9Pekap05UIvSrVF6TStoxta9lqulZdZhc1+UPKaFOMJQjNJWi5XvZbLp47OJF9ktkx74/Wdt/Th/p18aK22t6fm61pPWSYY6zlVPynzbWnShGO1xUpPs0kSMq8qNsKUFNfjhKHdUZxGgz+n5w6nUY/V1KPgQPOqWVSv/ANOlFddSTcl2U4PrOaT8qte1o0aSb1YSfs0kROivS+cMqqTymT0K+ipTwtTkr6LdsFFpuL4W3E2LRXpFrX9OnPnG/wCW6K+aJmIh2GvT0raFrq+Duk1ZXWrDZjYU0/tWu9iu0lzti7y3bjxk71O+k3e1r2ta71t/dW3Yi7Vi3Zp2dnbc1tw6l2Ee/DaN/hb/AN9+b3r/AJs5mateGi9ccOrZ4rqMga9miThUV3fSVnsV9a+OJsJpabJW9PDyjgr5KzWeIACwjAAAAAGgZ8qXyip61uxJeBBrPby7y9nKelVqP8c/3SIVSrZfG/8AufOZZ3vM+7XpHhhdvezduXH3FuVS7wTb3X9+wjrKNW7+pcpye1YdmF9pA7l6mlt69qXh3lyMdyw37WeK0rakub1dS1sRrX1PjjrZ64e47b2IzqqMqcXf01J8PR0Xj2l2TSdnt8eJFeVWqQi44vTcXbBYR0uKvdaj3Z7DK5pXpT6l7Hr3m+5mfzMOT72aNmiH0nva8Tes0L5mHJ97NPQeb6fup6nl9Uw0fpnlGllEaf3IJ9cnd+xI3g5lnuvpZXWlulo/lWj4Mm7Qtti29Zc6Su990OpG2vliQc9ZxhkNCVSMYp2UYqKS0pPUnw28kZVYrv8Aacr6Z5zdau4J+hSvFbnL7T8OoztJh+Lk26dVvPk7ld+rDvKZVnKc3pTk9KT3t+GzqLWUzsubXx2XLFODvg7NbeB7cG8W2+7sPoYjZklD0rK6XGTSXNt6i7lMYp+jq6nt4FqmrFyolsv1tPuR6LWRyvLmr+0l1JWWOGDvytqIcaXU1qaK1E9bd7cl3AdQ8l3SJ1o/I6snp0/Soy+1orBx4uKe3XF8Do9O+tycm7Xbtx2JJLafOOassnk1SnWh9OElJcd6fBptdZ9CZszhDKKMK0HhOKkuvY+K1GLr8c453r5Z6e69p7RbnzhPc3FprY0+x3NrTNMqVGbXm2ppUoP8Me21mddm281XOqrylJABrKgAAAYKNXA5fUqYye93IdaonqeD1NYmT6X5ieSZNUq+cjKNlFKzUnpOy2tbX2HJKeXzoO8JOPBYxfOLwMmvZ+S9ZmeEr9tXWsxEcYb/AEKl8Hsw4+4rKW56seNuvk+ZqGS9Jk2tNJO+LWp9T/qbFk+XwqJSjK/C+rV1x2a8Cnl02TF5oT0zUv5ZZLTaWv2PDmtr1BtJ62+rl3linU1Wbw7V/QuueNnhys1r46vjUQu1ybu7lFQjOcJrXBSVtSelo35avaeZ69m2/wAbiEsvSbxs7tW46mjzj0e8Gz5qfoz1YNfC36zecyu9GD4PvZznM9R+bk3qbXZbcdEzA/4enyfezT7Ptvfb0j91PVRtXf3ZA5ZnCletW3+crP8A9kvE6mcyz1SdPKa1vvyf525ePtJe0o8FZ93GjnxS1vP2c3k9CpP7VrR9Z4L39RpvQPoy855UqTclTitKpJfSs3ZRTept3x3RkTPKFlylKnSWxOcuf0Y+zS7TqHkZzD8nyVVZL06tqkt60l6EeqGzfJkugx9zF3usuNVfvX29GQp+SjNkY2VGd/vedqN+2TRFj5IM33ves193Tjb9tzoILiu0heSrNv8ApS/Ox/yqzZ/pS/OzdwBz+t5Ic3y1eejylHxiX8m8k+bYq0qc6nGVSS/bY3kAcG8qnk8pZBTWU5LpKndKpCUnPRu7KUW7vW0mnv2Wd6+SXOulCpkreMX5yHqy+kuqWP8AOdl6R5vjlOT1KU1eMoyTXBqz9jZ83ZgqSzfnGMJv6FR0ZvfGT0dLljGRDqcfxMUx1SYrd28S7dOFzZsw/UQ/m/czW27RZtOaYWo0/VT7cfEzezY8c/Ja1U+GEsAGwogAAAADWenvR2rnCgqVKqqcoy0rSTcJYNWdsVr1nJMv8ludIt2hQmvwVWn2Siu8+gQexMw82fMlfyeZ1j/kpv1Z0n/uIz6GZ0h/kcoXq6PhI+pAO8bPk+tkGd6Dv5rLorjGpNL2NFP8TZdS+sVXb9Oko9uCufWJ4nRjLXFPmkyO2OludY/B3F7RymXy1Hp/lDtaipNanotdzxMr0Dz/ADo1qlStkbrRqRcXB20cZKTk1KLvK64a2fQ0800Hro0/yx9xWGa6MdVKC5JHlcVKb92Ijcte1uctXzBlGR1fSWSzg3a8ZJyguUbuK7DcKDjZKKslqSVkIUIrVFLqLh1Wla8oeTaZ5hoXlByJwl8oX0ZKMZW2SWCb3Kz9hvpHyrIoVFaSucZsUZad2XePJNLbw+YaWSfLs5RovFSqaMt2hBXnywjLtPpLIKtOjBQUo8bNa/jDqMe+hORabqKhFTd05RVpNPXdrEr/AISydaovtZJWO7WK+ji07zMsv8uj95FPl0d6INPMcI6r9p7/AOEx4nrxL+XR3ofLo70QnmiL3lFmePECd8ujvRVZbHeiF/wlcSqzTHiBN+XQ2yXacE8s2aI0cphXg1o1U4tr70fo9ejh/IjtFXo5Sn9JPtZHr9CMjqpRqUlNJ3Sn6Svir2e3F9oGv9Fst+W0aNvpThBz4XS0r9dzokEkklqWCMXkXRzJ6KSp01FLUlglySMpCCirIr4NPGLfbqkyZJvs9AAsIwAAAAAAAAAAAAAAAAAAAAAAACxSxUAUsLFQBSxWwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z",
      id: "dfsd",
    },
  ];

  const [id] = useState(route.params.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([
    { _id: "12334", category: "Kitchen" },
    { _id: "123345", category: "Appliance" },
    { _id: "1233456", category: "Clothes" },
  ]);
  const [visible, setVisible] = useState(false);

  const submitHandler = () => {
    console.log(name, description, price, stock, categoryId);
  };

  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
        <Header back={true} />

        <View style={{ marginBottom: 20 }}>
          <Text style={formHeading}>Update Product</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}>
            <View
              style={{
                justifyContent: "center",
                minHeight: 650,
              }}>
              <Button
                onPress={() =>
                  navigation.navigate("productimages", {
                    id,
                    images: images,
                  })
                }
                textColor={colors.color1}>
                Manage Images
              </Button>

              <TextInput
                {...inputOptions}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                {...inputOptions}
                placeholder="Descriprion"
                value={description}
                onChangeText={setDescription}
              />

              <TextInput
                {...inputOptions}
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
              />

              <TextInput
                {...inputOptions}
                placeholder="Stock"
                keyboardType="number-pad"
                value={stock}
                onChangeText={setStock}
              />

              <Text
                onPress={() => setVisible(true)}
                style={{
                  ...inputStyling,
                  textAlign: "center",
                  borderRadius: 3,
                  textAlignVertical: "center",
                }}>
                {category}
              </Text>

              <Button
                disabled={loadingOther}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loadingOther}
                textColor={colors.color2}>
                Update
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategoryId={setCategoryId}
        setCategory={setCategory}
        categories={categories}
      />
    </>
  );
};

export default UpdateProduct;
