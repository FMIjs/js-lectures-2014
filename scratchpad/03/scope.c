#include <stdio.h>

int main(int argc, const char *argv[])
{
    int a = 0;

    for (int i = 0; i < 10; ++i) {
        int j = i * 2;
        a++;
    }

    printf("%d", a); // 9
    printf("%d", j);

    return 0;
}
