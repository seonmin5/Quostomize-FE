import { NextResponse } from "next/server";
import { auth } from '../../../../auth'

export async function PATCH(request) {
    const session = await auth();
    const accessToken = session.accessToken;

    try {
        const body = await request.json();
        const { cardSequenceId, benefitRate, lowerCategoryId, upperCategoryId, secondaryAuthCode } = body;

        if (!session || !session.accessToken) {
            return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
        }

        if (!cardSequenceId || !benefitRate || lowerCategoryId === undefined || upperCategoryId === undefined) {
            return NextResponse.json({
                message: "필수 필드가 누락되었습니다.",
                status: 400
            });
        }

        if (!secondaryAuthCode) {
            return NextResponse.json({
                message: "2차 인증 코드가 누락되었습니다.",
                status: 400,
            });
        }

        const backendResponse = await fetch(
            `${process.env.SERVER_URL}/v1/api/benefit-change/reserve`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(body),
                credentials: "include",
            });

        if (!backendResponse.status !== 204) {
            const errorData = await backendResponse.json();
            return NextResponse.json(
                { message: errorData.message || '서버 오류 발생', status: backendResponse.status }
            );

        }
        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { authSuccess: false, message: '서버 오류 발생', status: 500 }
        );
    }
}